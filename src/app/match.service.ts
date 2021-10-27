import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {ITeams} from './Shared/models/teams';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  baseUrl = environment.apiUrl;
  constructor(
    private http: HttpClient
  ) { }

  getTeams (){
    return this.http.get<ITeams[]>(this.baseUrl + 'Teams');
  }
}
