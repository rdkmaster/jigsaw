import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {TimeBasicDemoComponent} from "./basic/basic";
import {RdkTimeModule} from "../../../../component/time/index";
import {RdkButtonModule} from "../../../../component/button/button";
import {TimeLimitEndComponent} from "./limitEnd/limitEnd";
import {RdkTileSelectModule} from "../../../../component/tile-select/tile-select";
import {TimeLimitStartComponent} from "./limitStart/limitStart";
import {TimeWeekStartComponent} from "./weekStart/weekStart";
import {TimeGrComponent} from "./gr/gr";
import {TimeRecommendedComponent} from "./recommended/recommended";
import {TimeGrItemsComponent} from "./grItems/grItems";
import {TimeRefreshIntervalComponent} from "./refreshInterval/refreshInterval";
import {CommonModule} from "@angular/common";



const inputDemoRoutes=[
    {
        path:'',
        redirectTo:'basic',
        pathMatch:'full'
    },
    {
        path:'basic', component: TimeBasicDemoComponent
    },{
        path:'limitEnd', component: TimeLimitEndComponent
    },{
        path:'limitStart', component: TimeLimitStartComponent
    },{
        path:'weekStart', component: TimeWeekStartComponent
    },{
        path:'gr', component: TimeGrComponent
    },{
        path:'recommended', component: TimeRecommendedComponent
    },{
        path:'grItems', component: TimeGrItemsComponent
    },{
        path:'refreshInterval', component: TimeRefreshIntervalComponent
    },
    {
        path:'**', //fallback router must in the last
        component: TimeBasicDemoComponent
    }
];

@NgModule({
    declarations: [
        TimeBasicDemoComponent,TimeLimitEndComponent,TimeLimitStartComponent,TimeWeekStartComponent,TimeRecommendedComponent,
        TimeGrComponent,TimeGrItemsComponent,TimeRefreshIntervalComponent
    ],
    imports: [
        RouterModule.forChild(inputDemoRoutes), RdkTimeModule,RdkButtonModule,RdkTileSelectModule,CommonModule
    ],
    providers: []
})
export class TimeDemoModule { }
