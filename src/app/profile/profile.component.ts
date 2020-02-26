import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  name: string;
  sewa: string;
  startTime: string;
  endTime: string;
  data: Entity[];
  isSaveInProcess = false;

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
    this.dataService.getData().subscribe((data: Entity[]) => {
      this.data = data;
    });
  }

  validateForm() {
    return this.name && this.sewa && this.startTime && this.data && !this.isSaveInProcess;
  }

  saveRecord() {
    if (this.validateForm()) {
      const entity: Entity = {
        id: this.data.length + 1,
        name: this.name,
        sewa: this.sewa,
        startTime: this.startTime,
        endTime: this.endTime
      };
      this.data.push(entity);
      this.isSaveInProcess = true;
      this.dataService.update(this.data).subscribe(data => {
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
