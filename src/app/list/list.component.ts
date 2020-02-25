import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  data: Entity[];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getData().subscribe((data: Entity[]) => {
      this.data = data;
      console.log('data', data);
    });
  }
}
