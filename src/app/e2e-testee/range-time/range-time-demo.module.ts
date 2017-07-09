import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {JigsawTileSelectModule} from "jigsaw/component/tile-select/tile-select";
import {JigsawRangeTimeModule} from "jigsaw/component/range-time/index";
import {RangeTimeBasicDemoComponent} from "./basic/basic";
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
        RouterModule.forChild(rangeTimeDemoRoutes), JigsawRangeTimeModule,JigsawButtonModule,JigsawTileSelectModule,CommonModule
    ],
    providers: []
})
export class RangeTimeDemoModule { }
