import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {RadioFullModule} from "./full/demo.module";
import {RadioTrackItemByDemoModule} from "./track-item-by/demo.module";

import {RadioFullComponent} from "./full/demo.component";
import {RadioTrackItemByDemoComponent} from "./track-item-by/demo.component";
import {RadioAllModule} from "./demo.module";
import {RadioAllComponent} from "./demo.component";

export const routerConfig = [
    {
       path: 'all', component: RadioAllComponent
    },
    {
        path: 'full', component: RadioFullComponent
    },
    {
        path: 'track-item-by', component: RadioTrackItemByDemoComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        RadioFullModule,
        RadioTrackItemByDemoModule,
        RadioAllModule
    ]
})
export class RadioDemoModule { }
