import { Component } from '@angular/core';

@Component({
  selector: 'app-root', // <app-root></app-root>
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-chat';

  cars = [
    "BMW",
    "Mercedes-Benz",
    "Audi"
  ];

  calculate(substractValue) {
    const result = this.add(2, 4) - substractValue;
    return result;
  }

  add(a: number, b: number): number {
    const sum = a+b;
    console.error("debugging `add`");
    return sum;
  }

  shortAdd = (a,b) => a+b;

  dummyJson: any = {
    a: 1,
    b: 2,
    somethingElse: [
      "a", "b", "c"
    ]
  }

  changeDummyJson() {
    this.dummyJson = "something else";
  }
}
