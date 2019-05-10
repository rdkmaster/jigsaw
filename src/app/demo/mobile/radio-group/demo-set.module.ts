import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {RadioBasicDemoModule} from "./basic/demo.module";
import {RadioFullModule} from "./full/demo.module";
import {RadioTrackItemByDemoModule} from "./track-item-by/demo.module";

import {RadioFullComponent} from "./full/demo.component";
import {RadioBasicDemoComponent} from "./basic/demo.component";
import {RadioTrackItemByDemoComponent} from "./track-item-by/demo.component";

export const routerConfig = [
    {
        path: 'full', component: RadioFullComponent
    },
    {
        path: 'basic', component: RadioBasicDemoComponent
    },
    {
        path: 'track-item-by', component: RadioTrackItemByDemoComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        RadioBasicDemoModule,
        RadioFullModule,
        RadioTrackItemByDemoModule
    ]
})
export class RadioMobileDemoModule { }
