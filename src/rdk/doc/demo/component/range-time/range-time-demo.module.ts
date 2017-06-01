import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {RdkButtonModule} from "../../../../component/button/button";
import {RdkTileSelectModule} from "../../../../component/tile-select/tile-select";
import {RangeTimeBasicDemoComponent} from "./basic/basic";
import {RdkRangeTimeModule} from "../../../../component/range-time/index";
import {CommonModule} from "@angular/common";
import {RangeTimeGrComponent} from "./gr/gr";
import {RangeTimeGrItemsComponent} from "./grItems/grItems";
import {RangeTimeLimitEndComponent} from "./limitEnd/limitEnd";
import {RangeTimeLimitStartComponent} from "./limitStart/limitStart";
import {RangeTimeRecommendedComponent} from "./recommended/recommended";
import {RangeTimeRefreshIntervalComponent} from "./refreshInterval/refreshInterval";
import {RangeTimeWeekStartComponent} from "./weekStart/weekStart";




const rangeTimeDemoRoutes=[
    {
        path:'',
        redirectTo:'basic',
        pathMatch:'full'
    },
    {
        path:'basic', component: RangeTimeBasicDemoComponent
    },{
        path:'gr', component: RangeTimeGrComponent
    },{
        path:'grItems', component: RangeTimeGrItemsComponent
    },{
        path:'limitEnd', component: RangeTimeLimitEndComponent
    },{
        path:'limitStart', component: RangeTimeLimitStartComponent
    },{
        path:'recommended', component: RangeTimeRecommendedComponent
    },{
        path:'refreshInterval', component: RangeTimeRefreshIntervalComponent
    },{
        path:'weekStart', component: RangeTimeWeekStartComponent
    },
    {
        path:'**', //fallback router must in the last
        component: RangeTimeBasicDemoComponent
    }
];

@NgModule({
    declarations: [
        RangeTimeBasicDemoComponent,RangeTimeGrComponent,RangeTimeGrItemsComponent,RangeTimeLimitEndComponent,
        RangeTimeLimitStartComponent,RangeTimeRecommendedComponent,RangeTimeRefreshIntervalComponent,
        RangeTimeWeekStartComponent
    ],
    imports: [
        RouterModule.forChild(rangeTimeDemoRoutes), RdkRangeTimeModule,RdkButtonModule,RdkTileSelectModule,CommonModule
    ],
    providers: []
})
export class RangeTimeDemoModule { }
