import { Injectable } from '@angular/core';

import { Http } from "@angular/http";
import "rxjs/add/operator/map";
@Injectable()
export class DataService {

  constructor(private http:Http) { }

  getData(){
    return this.http.get('/api/show').map(res=>res.json().message)
  }
  addData(input:string){
    const data = {name : input}
    return this.http.post('/api/add',data).map(res=>res.json().message)
  }
  delData(input){
    console.log(input)
    return this.http.delete('/api/delete/'+input).map(res=>res.json().message)
  }
}
