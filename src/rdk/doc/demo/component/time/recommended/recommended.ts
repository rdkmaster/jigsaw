import { Component } from "@angular/core";


@Component({
  templateUrl: 'recommended.html'
})
export class TimeRecommendedComponent {


    date = new Date();


    recommended = ["now-15d","now-10d"];
}

