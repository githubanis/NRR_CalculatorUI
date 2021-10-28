import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {isNumber} from 'util';
import {MatchService} from '../match.service';
import {Match} from '../Shared/models/match';
import {Teams} from '../Shared/models/team';
import {ITeams} from '../Shared/models/teams';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private matchService: MatchService,
  ) { }
  teams: ITeams[];
  showTextBox2 = false;
  showTextBox1 = false;
  options = false;
  textBox = false;
  name: string = "";
  inputField = false;
  team1Id: number;
  team2Id: number;
  scores1: string = "";
  scores2: string = "";
  over1: string = "";
  over2: string = "";

  ngOnInit(): void {
    this.getTeamsData();
  }

  changeMatch1(event): void {
    if (event.target.value !== '1') {
      this.showTextBox1 = true;
      const id = this.teams.find(p => p.teamName === event.target.value).teamId;
      this.team1Id = id;
    }
    else {
      this.team1Id = -1;
      this.showTextBox1 = false;
    }
    console.log(this.showTextBox1);
  }

  changeMatch2(event): void {
    if (event.target.value !== '1') {
      this.showTextBox2 = true;
      const id = this.teams.find(p => p.teamName === event.target.value).teamId;
      this.team2Id = id;
    }
    else {
      this.team2Id = -2;
      this.showTextBox2 = false;
    }
    console.log(this.showTextBox2);
  }

  showOptions(): void {
    this.options = true;
  }

  Calculate(): void {
    if(this.team1Id === this.team2Id) {
      alert('Please select different team name.');
    }
    else if(this.team1Id < 0 || this.team2Id < 0) {
      alert('Please select team name.');
    }
    else if(isNaN(+this.scores1) || isNaN(+this.scores2)) {
      alert('Please use a numerical value as score.');
    }
    else if(isNaN(+this.over1) || isNaN(+this.over2)) {
      alert('Please use a numerical value as over.');
    }
    else if(Number(this.scores1) <= 0 || Number(this.scores2) <= 0) {
      alert('Team Score cannot be 0 or negative.');
    }
    else if(Number(this.over1) <= 0 || Number(this.over2) <= 0) {
      alert('Team Over cannot be 0 or negative.');
    }
    else {
      const match = new Match();
      match.team1Id = this.team1Id;
      match.team2Id = this.team2Id;
      match.scores1 = Number(this.scores1);
      match.scores2 = Number(this.scores2);
      match.over1 = Number(this.over1);
      match.over2 = Number(this.over2)
      this.matchService.saveMatch(match).subscribe(
        (res) => {
          this.ClearVal();
          this.ngOnInit();
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  getTeamsData(): void {
    this.matchService.getTeams().subscribe(
      (res) => {
        this.teams = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  deleteTeam(teamId: any): void {
    alert('are you sure you want to delete?');
    this.matchService.removeTeam(teamId).subscribe(
      (res) => {
        this.ngOnInit();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ShowTextBox(): void {
    this.textBox = true;
  }

  ShowButton(): void {
    this.inputField = true;
  }

  SaveTeam(): void {
    if(this.name === '' || this.name.length > 56) {
      alert('Please Enter a valid team name.');
      this.name = '';
    }
    else if(!isNaN(+this.name) || this.CheckName(this.name)) {
      alert('Team Name cannot be numerical.');
      this.name = '';
    }
    else if(this.CheckSpecialCharacter(this.name)) {
      alert('Team Name cannot contain special characters.');
      this.name = '';
    }
    else if(this.name.length <= 1) {
      alert('Team Name cannot be one character.');
      this.name = '';
    }
    else {
      const team = new Teams();
      team.teamId = 0;
      team.teamName = this.name;
      team.teamNRR = 0.0;
      this.matchService.saveTeam(team).subscribe(
        (res) => {
          //console.log(res);
          this.ngOnInit();
        },
        (err) => {
          console.log(err);
        }
      );
      this.name = '';
    }
  }

  ClearVal(): void {
    this.showTextBox1 = false;
    this.showTextBox2 = false;
    this.scores1 = '';
    this.scores2 = '';
    this.over1 = '';
    this.over2 = '';
  }

  CheckName(name: string): boolean {
    let result = false;
    for (let i = 0; i < name.length; i++) {
      let number = name[i];
      if(number.charCodeAt(0) >= 48 && number.charCodeAt(0) <= 57) {
        result = true;
        break;
      }
    }
    return result;
  }
  CheckSpecialCharacter(name: string): boolean {
    let result = false;
    var format = /[!@~`#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if( name.match(format) ){
      result =true;
    }
    return result;
  }
}
