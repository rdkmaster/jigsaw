import {NgModule} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {JigsawRadioModule} from "jigsaw/component/radio/radio";
import {JigsawRootModule} from "jigsaw/component/root/root";
import {JigsawBoxModule} from "jigsaw/component/box/index";

import {MonitorComponent} from './demo.component';
import {TableMonitorComponent} from "./monitors/table.comp";
import {GraphMonitorComponent} from "./monitors/graph.comp";
import {NewMonitorComponent} from "./monitors/new-monitor.comp";
import {MonitorsModule} from "./monitors/monitors.module";
import {MonitorService} from "./monitors/monitor-service";
import {AjaxInterceptor} from "app/app.interceptor";


@NgModule({
    declarations: [
        MonitorComponent
    ],
    imports: [
        CommonModule, TranslateModule.forRoot(), HttpClientModule,
        JigsawBoxModule, JigsawRadioModule, JigsawRootModule, MonitorsModule
    ],
    providers: [MonitorService],
    bootstrap: [MonitorComponent],
    entryComponents: [TableMonitorComponent, GraphMonitorComponent, NewMonitorComponent]
})
export class MonitorModule {
    constructor() {
        // register mock data simulator
        AjaxInterceptor.registerProcessor('/monitor/statistics/indicators', req => {
            if (req.method == 'get') {

            } else {

            }
        });

        AjaxInterceptor.registerProcessor(/^\/monitor\/statistics\/dashboard.*/, req => {

        });

        AjaxInterceptor.registerProcessor(/^\/monitor\/statistics\/dashboard\/all.*/, req => {

        });

        AjaxInterceptor.registerProcessor('/monitor/statistics/datatable', req => {

        });
    }
}
