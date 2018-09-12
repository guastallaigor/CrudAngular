import { HttpClient } from '@angular/common/http';

export class Core {
  url: string;

  constructor(private http:HttpClient, url:string) {
    this.url = url;
  }

  all() {
    return this.http.get<Array<any>>(this.url);
  }

  getById(id) {
    return this.http.get<any>(`${this.url}/${id}`);
  }

  add(obj){
    return this.http.post(this.url, obj);
  }

  edit(obj) {
    return this.http.put(`${this.url}/${obj.id}`, obj);
  }

  delete(id:number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
