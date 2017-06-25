import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";

import {TimeBasicDemoComponent} from "./basic/basic";
import {RdkTimeModule} from "../../../rdk/component/time/index";
import {RdkButtonModule} from "../../../rdk/component/button/button";
import {TimeLimitEndComponent} from "./limitEnd/limitEnd";
import {RdkTileSelectModule} from "../../../rdk/component/tile-select/tile-select";
import {TimeLimitStartComponent} from "./limitStart/limitStart";
import {TimeWeekStartComponent} from "./weekStart/weekStart";
import {TimeGrComponent} from "./gr/gr";
import {TimeRecommendedComponent} from "./recommended/recommended";
import {TimeGrItemsComponent} from "./grItems/grItems";
import {TimeRefreshIntervalComponent} from "./refreshInterval/refreshInterval";
import {ComboSelectDemoComponent} from "./comboSelect/comboSelect";
import {RdkComboSelectModule} from "../../../rdk/component/combo-select/index";
import {RdkRangeTimeModule} from "../../../rdk/component/range-time/index";


const inputDemoRoutes = [
    {
        path: '',
        redirectTo: 'basic',
        pathMatch: 'full'
    },
    {
        path: 'basic', component: TimeBasicDemoComponent
    }, {
        path: 'limitEnd', component: TimeLimitEndComponent
    }, {
        path: 'limitStart', component: TimeLimitStartComponent
    }, {
        path: 'weekStart', component: TimeWeekStartComponent
    }, {
        path: 'gr', component: TimeGrComponent
    }, {
        path: 'recommended', component: TimeRecommendedComponent
    }, {
        path: 'grItems', component: TimeGrItemsComponent
    }, {
        path: 'refreshInterval', component: TimeRefreshIntervalComponent
    }, {
        path: 'withComboSelect', component: ComboSelectDemoComponent
    },
    {
        path: '**', //fallback router must in the last
        component: TimeBasicDemoComponent
    }
];

@NgModule({
    declarations: [
        TimeBasicDemoComponent, TimeLimitEndComponent, TimeLimitStartComponent, TimeWeekStartComponent, TimeRecommendedComponent,
        TimeGrComponent, TimeGrItemsComponent, TimeRefreshIntervalComponent, ComboSelectDemoComponent
    ],
    imports: [
        RouterModule.forChild(inputDemoRoutes), CommonModule, RdkTimeModule, RdkButtonModule, RdkTileSelectModule,
        RdkComboSelectModule, RdkRangeTimeModule
    ],
    providers: []
})
export class TimeDemoModule {
}
