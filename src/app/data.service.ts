import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable()
export class DataService {

  secret = '$2b$10$KoTfRG6TNgsR95x6dHqPz.CdBGM/l2n.tGHCIvV5jzgHoHZ5I2HtO';
  jsBinPut: string;
  jsBin: string;

  constructor(private http: HttpClient) {
    if (environment.production) {
      this.jsBinPut = 'https://api.jsonbin.io/b/5e552ad461ef782ce2bf143b';
      this.jsBin = `${this.jsBinPut}/4`;
    } else {
      this.jsBinPut = 'https://api.jsonbin.io/b/5e55d63061ef782ce2bf6b32';
      this.jsBin = `${this.jsBinPut}`;
    }
  }

  getData() {
    return this.http.get(this.jsBin, { headers: { 'secret-key': this.secret } });
  }

  update(data: Entity[]) {
    return this.http.put<Entity[]>(this.jsBinPut, data, { headers: { 'secret-key': this.secret, 'versioning': 'false' } });
  }

}
