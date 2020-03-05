import { Injectable } from '@angular/core';

@Injectable()
export class AppUtilsService {

  constructor() { }

  getFormattedDate(date: Date) {
    const dd = date.getDate();
    const mm = date.getMonth() + 1;
    let ddd = dd.toString();
    let mmm = mm.toString();

    const yyyy = date.getFullYear();
    if (dd < 10) {
      ddd = '0' + dd;
    }
    if (mm < 10) {
      mmm = '0' + mm;
    }
    return ddd + '/' + mmm + '/' + yyyy;
  }
}
