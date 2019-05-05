import {EventEmitter, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {tap} from "rxjs/operators";

@Injectable()
export class MonitorService {
    constructor(private _http: HttpClient) {
    }

    private _indicatorsQueryOnGoing = false;
    private _indicators: any[];

    public events = new EventEmitter<any>();

    public get indicators(): any[] | Observable<any[]> {
        if (this._indicatorsQueryOnGoing) {
            return this._indicators;
        }

        this._indicatorsQueryOnGoing = true;
        const url = '/monitor/statistics/indicators';
        return this._indicators ? this._indicators :
            this._http.get<any[]>(url).pipe(tap(data => this._indicators = data));
    }

    public set indicators(v: any[] | Observable<any[]>) {
        const indicators = <any[]>v;
        indicators.forEach(r => r.series.forEach(i => {
            i.regionname = r.regionname;
            i.regionid = r.regionid;
        }));
        this._indicators = indicators;
        this._indicatorsQueryOnGoing = false;
    }

    public createIndicator(name, type, indicators) {
        const url = '/monitor/statistics/indicators';
        name = name ? name : 'New Monitor';
        const body = {name, type, series: []};
        indicators.forEach(i => body.series.push({regionid: i.regionid, indicatorid: i.indicatorid}));
        this._http.post(url, body).subscribe(result => {
            console.log("create indicator result:");
            console.log(result);
            this.events.emit({type: 'pull-data'});
        });
    }

    public removeIndicator(chartId) {
        if (chartId == 0) {
            console.error("invalid chartId[0]");
            return;
        }
        const url = `/monitor/statistics/dashboard`;
        this._http.delete(url, {params: {chartID: chartId}}).subscribe(result => {
            console.log("remove indicator result:");
            console.log(result);
            this.events.emit({type: 'pull-data'});
        });
    }
}
