import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {RdkButtonModule} from "../../../../component/button/button";
import {RdkTileSelectModule} from "../../../../component/tile-select/tile-select";
import {RangeTimeBasicDemoComponent} from "./basic/basic";
import {RdkRangeTimeModule} from "../../../../component/range-time/index";
import {CommonModule} from "@angular/common";




const rangeTimeDemoRoutes=[
    {
        path:'',
        redirectTo:'basic',
        pathMatch:'full'
    },
    {
        path:'basic', component: RangeTimeBasicDemoComponent
    },
    {
        path:'**', //fallback router must in the last
        component: RangeTimeBasicDemoComponent
    }
];

@NgModule({
    declarations: [
        RangeTimeBasicDemoComponent
    ],
    imports: [
        RouterModule.forChild(rangeTimeDemoRoutes), RdkRangeTimeModule,RdkButtonModule,RdkTileSelectModule,CommonModule
    ],
    providers: []
})
export class RangeTimeDemoModule { }
