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

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getData().subscribe(data => {
      console.log('data', data);
    });
  }

  saveRecord() {
    console.log('name', this.name);
    
  }

}
