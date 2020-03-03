import { Injectable } from '@angular/core';

@Injectable()
export class AppUtilsService {

  constructor() { }

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
}
