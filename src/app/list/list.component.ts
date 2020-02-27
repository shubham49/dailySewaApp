import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { ExcelService } from '../excel.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  data: Entity[];

  constructor(private dataService: DataService, private router: Router,
    private excelService: ExcelService) { }

  ngOnInit() {
    this.dataService.getData().then((data: Entity[]) => {
      this.data = data;
    });
  }

  addEntry() {
    this.router.navigate(['/']);
  }

  edit(entity: Entity) {
    this.router.navigate(['/'], {queryParams: {id: entity.id}});
  }

  exportExcel() {
    this.excelService.exportAsExcelFile(this.data, 'dailySewa');
  }
}
