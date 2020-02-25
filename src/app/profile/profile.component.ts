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
  startTime: string;
  endTime: string;
  data: Entity[];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getData().subscribe((data: Entity[]) => {
      this.data = data;
      console.log('data', data);
    });
  }

  saveRecord() {
    if (this.name && this.startTime && this.endTime && this.data) {
      const entity: Entity = {
        id: this.data.length + 1,
        name: this.name,
        startTime: this.startTime,
        endTime: this.endTime
      };
      this.data.push(entity);
      this.dataService.update(this.data).subscribe(data => {
        console.log('data', data);
      });
    }

  }

}
