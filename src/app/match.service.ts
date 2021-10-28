import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {ITeams} from './Shared/models/teams';
import {Teams} from './Shared/models/team';
import {Match} from './Shared/models/match';

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
  saveTeam(team: Teams) {
    return this.http.post<Teams>(this.baseUrl + 'Teams', team);
  }
  removeTeam(id: number) {
    return this.http.delete(this.baseUrl + 'Teams/' + id);
  }
  saveMatch(match: Match) {
    return this.http.post<Match>(this.baseUrl + 'Matches', match);
  }
}
