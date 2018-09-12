import { Injectable } from '@angular/core';
import { Core } from '../services/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfissoesService extends Core {
  constructor(anotherHttp: HttpClient) {
    super(anotherHttp, 'api/profissoes');
  }
}
