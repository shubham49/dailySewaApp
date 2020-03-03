import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { AppUtilsService } from '../services/app-utils.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  entity: Entity;
  data: Entity[];
  isSaveInProcess = false;
  searchField: string;
  filteredNameOptions: string[];
  nameOptions = new Set();

  constructor(private dataService: DataService, private router: Router,
    private route: ActivatedRoute, private appUtils: AppUtilsService) {
    this.init();
  }

  private init() {
    this.entity = {
      id: null,
      date: this.appUtils.getCurrentDate(),
      endTime: '',
      name: '',
      sewa: '',
      startTime: '',
      signature: ''
    };
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
    });
  }

  populateNameOptions() {
    this.data.forEach(entry => this.nameOptions.add(entry.name));
  }

  onNameChange(val: string) {
    this.filteredNameOptions = [];
    this.nameOptions.forEach((option: string) =>
      option.toLowerCase().indexOf(val.toLowerCase()) === 0 && this.filteredNameOptions.push(option));
  }

  validateForm() {
    return this.entity.name && this.entity.sewa &&
      !this.isSaveInProcess && this.entity.date;
  }

  saveRecord() {
    if (this.validateForm()) {
      if (!this.entity.id) {
        this.entity.id = this.data.length + 1;
      }
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
