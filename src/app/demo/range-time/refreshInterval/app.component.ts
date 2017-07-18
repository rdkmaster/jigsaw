import { Component } from "@angular/core";


@Component({
  templateUrl: './app.component.html'
})
export class RangeTimeRefreshIntervalComponent {
    beginDate = "now-1d";

    endDate = "now";

}

