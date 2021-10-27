import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'NRR Calculator';

  constructor() {}

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit(): void {
  }
}
