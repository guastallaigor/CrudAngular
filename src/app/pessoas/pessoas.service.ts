import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Core } from '../services/core';

@Injectable({
  providedIn: 'root'
})
export class PessoasService extends Core {
  constructor(anotherHttp:HttpClient) {
    super(anotherHttp, 'api/pessoas');
  }
}
