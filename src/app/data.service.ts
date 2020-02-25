import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {

  secret = '$2b$10$KoTfRG6TNgsR95x6dHqPz.CdBGM/l2n.tGHCIvV5jzgHoHZ5I2HtO';
  jsBinPut = 'https://api.jsonbin.io/b/5e552ad461ef782ce2bf143b';
  jsBin = `${this.jsBinPut}/4`;

  constructor(private http: HttpClient) { }

  getData() {
    console.log('called');

    return this.http.get(this.jsBin, { headers: { 'secret-key': this.secret } });
  }

  update(data: Entity[]) {
    return this.http.put<Entity[]>(this.jsBinPut, data, { headers: { 'secret-key': this.secret, 'versioning': 'false' } });
  }

}
