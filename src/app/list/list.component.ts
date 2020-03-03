import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from '../services/data.service';
import { ExcelService } from '../services/excel.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'date', 'sewa', 'startTime', 'endTime', 'actions'];
  dataSource;

  constructor(private dataService: DataService, private router: Router,
    private excelService: ExcelService) { }

  ngOnInit() {
    this.dataService.getData().then((data: Entity[]) =>
      this.dataSource = new MatTableDataSource(data)
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addEntry() {
    this.router.navigate(['/']);
  }

  edit(entity: Entity) {
    this.router.navigate(['/'], { queryParams: { id: entity.id } });
  }

  exportExcel() {
    this.excelService.exportAsExcelFile(this.dataSource.filteredData, 'dailySewa');
  }
}
