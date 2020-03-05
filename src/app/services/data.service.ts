import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class DataService {

  secret = '$2b$10$KoTfRG6TNgsR95x6dHqPz.CdBGM/l2n.tGHCIvV5jzgHoHZ5I2HtO';
  jsBinPut: string;
  jsBin: string;
  data: Entity[];

  constructor(private http: HttpClient) {
    if (environment.production) {
      this.jsBinPut = 'https://api.jsonbin.io/b/5e552ad461ef782ce2bf143b';
      this.jsBin = `${this.jsBinPut}/4`;
    } else {
      // this.jsBinPut = 'http://localhost:4200/assets/data.json';
      this.jsBinPut = 'https://api.jsonbin.io/b/5e55d63061ef782ce2bf6b32';
      this.jsBin = `${this.jsBinPut}`;
    }
  }

  async getData() {
    if (this.data) {
      return this.data;
    }
    this.data = await this.http.get<Entity[]>(this.jsBin, { headers: { 'secret-key': this.secret } }).toPromise();
    return this.data;
  }

  update(ent: Entity) {
    if (!this.updateExistingData(ent)) {
      this.data.push(ent);
    }
    return this.http.put<Entity[]>(this.jsBinPut, this.data, { headers: { 'secret-key': this.secret, 'versioning': 'false' } });
  }

  delete(ent: Entity) {
    this.deleteExistingData(ent);
    return this.http.put<Entity[]>(this.jsBinPut, this.data, { headers: { 'secret-key': this.secret, 'versioning': 'false' } });
  }

  deleteExistingData(ent: Entity) {
    this.data = this.data.filter(entity => entity.id != ent.id);
  }

  updateExistingData(ent: Entity) {
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].id == ent.id) {
        this.data[i].name = ent.name;
        this.data[i].date = ent.date;
        this.data[i].sewa = ent.sewa;
        this.data[i].startTime = ent.startTime;
        this.data[i].endTime = ent.endTime;
        return true;
      }
    }
    return false;
  }

  getById(id: number): Entity {
    return this.data.filter(d =>
      d.id == id
    )[0];
  }

}
