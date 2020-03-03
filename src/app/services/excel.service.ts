import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable()
export class ExcelService {

  headers = ['id', 'name', 'sewa', 'date', 'startTime', 'endTime', 'signature'];
  constructor() { }

  public exportAsExcelFile(data: Entity[], excelFileName: string): void {
    this.populateSignatureField(data);
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data, { header: this.headers });
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private populateSignatureField(data: Entity[]) {
    data.forEach((entry, index) => {
      entry.signature = '';
      entry.id = index + 1;
    });
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
}
