import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { AppUtilsService } from '../services/app-utils.service';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { APP_DATE_FORMATS, AppDateAdapter } from './profile.adapter';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class ProfileComponent implements OnInit {
  entity: Entity;
  data: Entity[];
  isSaveInProcess = false;
  searchField: string;
  filteredNameOptions: string[];
  nameOptions = new Set();
  filteredSewaOptions: string[];
  sewaOptions = new Set();
  date: Date;

  constructor(private dataService: DataService, private router: Router,
    private route: ActivatedRoute, private appUtils: AppUtilsService) {
    this.init();
  }

  private init() {
    this.entity = {
      id: null,
      date: '',
      endTime: '',
      name: '',
      sewa: '',
      startTime: '',
      signature: ''
    };
    this.date = new Date();
  }

  ngOnInit() {
    this.dataService.getData().then((data: Entity[]) => {
      this.route.queryParams.subscribe(params => {
        const id = params['id'];
        if (id) {
          const existingEnt = this.dataService.getById(id);
          if (existingEnt) {
            this.entity = existingEnt;
          }
        }
      });
      this.data = data;
      this.populateNameOptions();
      this.populateSewaOptions();
    });
  }

  populateNameOptions() {
    this.data.forEach(entry => entry.name && this.nameOptions.add(entry.name));
  }

  populateSewaOptions() {
    this.data.forEach(entry => entry.sewa && this.sewaOptions.add(entry.sewa));
  }

  onNameChange(val: string) {
    this.filteredNameOptions = [];
    this.nameOptions.forEach((option: string) =>
      option.toLowerCase().indexOf(val.toLowerCase()) === 0 && this.filteredNameOptions.push(option));
  }

  onSewaChange(val: string) {
    this.filteredSewaOptions = [];
    this.sewaOptions.forEach((option: string) =>
      option.toLowerCase().indexOf(val.toLowerCase()) === 0 && this.filteredSewaOptions.push(option));
  }

  validateForm() {
    return this.entity.name && this.entity.sewa &&
      !this.isSaveInProcess && this.date;
  }

  saveRecord() {
    if (this.validateForm()) {
      if (!this.entity.id) {
        this.entity.id = this.data[this.data.length - 1].id + 1;
      }
      this.entity.date = this.appUtils.getFormattedDate(this.date);
      this.isSaveInProcess = true;
      this.dataService.update(this.entity).subscribe(data => {
        this.isSaveInProcess = false;
        this.init();
        window.alert('saved successfully');
      }, err => {
        this.isSaveInProcess = false;
        window.alert('some error occurred. Contact Admin');
      });
    }
  }

  listing() {
    this.router.navigate(['/list']);
  }

}
