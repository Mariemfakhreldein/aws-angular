import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private apiService : ApiService) { }
   getAll(){
    return this.apiService.get('/api/statistics');
   }
}
