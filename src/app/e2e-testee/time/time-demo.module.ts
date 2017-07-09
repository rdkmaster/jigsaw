import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";

import {JigsawTimeModule} from "jigsaw/component/time/index";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {JigsawTileSelectModule} from "jigsaw/component/tile-select/tile-select";
import {JigsawComboSelectModule} from "jigsaw/component/combo-select/index";
import {JigsawRangeTimeModule} from "jigsaw/component/range-time/index";

import {TimeBasicDemoComponent} from "./basic/basic";
import {TimeLimitEndComponent} from "./limitEnd/limitEnd";
import {TimeLimitStartComponent} from "./limitStart/limitStart";
import {TimeWeekStartComponent} from "./weekStart/weekStart";
import {TimeGrComponent} from "./gr/gr";
import {TimeRecommendedComponent} from "./recommended/recommended";
import {TimeGrItemsComponent} from "./grItems/grItems";
import {TimeRefreshIntervalComponent} from "./refreshInterval/refreshInterval";
import {ComboSelectDemoComponent} from "./comboSelect/comboSelect";


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
        RouterModule.forChild(inputDemoRoutes), CommonModule, JigsawTimeModule, JigsawButtonModule, JigsawTileSelectModule,
        JigsawComboSelectModule, JigsawRangeTimeModule
    ],
    providers: []
})
export class TimeDemoModule {
}
