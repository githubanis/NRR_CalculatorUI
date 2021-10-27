import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {MatchService} from '../match.service';
import {ITeams} from '../Shared/models/teams';

interface Food {
  value: string;
  viewValue: string;
}
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
  foods: Food[] = [
    {value: '1', viewValue: 'Select'},
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];
  showTextBox2 = false;
  showTextBox1 = false;
  options = false;

  ngOnInit(): void {
    this.getTeamsData();
  }

  changeMatch1(event): void {
    if (event.target.value !== '1') {
      this.showTextBox1 = true;
    }
    console.log(this.showTextBox1);
  }

  changeMatch2(event): void {
    if (event.target.value !== '1') {
      this.showTextBox2 = true;
    }
  }

  showOptions(): void {
    this.options = true;
    console.log();
  }

  Calculate(): void {

  }

  getTeamsData(): void {
    this.matchService.getTeams().subscribe(
      (res) => {
        this.teams = res;
        console.log('Teams Data: ', this.teams);
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
