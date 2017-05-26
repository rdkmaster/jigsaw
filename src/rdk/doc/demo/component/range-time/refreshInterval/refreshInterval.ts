import { Component } from "@angular/core";


@Component({
  templateUrl: 'refreshInterval.html'
})
export class RangeTimeRefreshIntervalComponent {
    beginDate = "now-1d";

    endDate = "now";

}

