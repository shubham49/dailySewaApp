import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  entity: Entity;
  data: Entity[];
  isSaveInProcess = false;

  constructor(private dataService: DataService, private router: Router,
    private route: ActivatedRoute) {
    this.entity = {
      id: null,
      date: this.getCurrentDate(),
      endTime: '',
      name: '',
      sewa: '',
      startTime: '',
      signature: ''
    };
  }

  getCurrentDate() {
    const today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth() + 1;
    let ddd = dd.toString();
    let mmm = mm.toString();

    const yyyy = today.getFullYear();
    if (dd < 10) {
      ddd = '0' + dd;
    }
    if (mm < 10) {
      mmm = '0' + mm;
    }
    return ddd + '/' + mmm + '/' + yyyy;
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
    });
  }

  validateForm() {
    return this.entity.name && this.entity.sewa &&
      this.entity.startTime && this.data &&
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
