import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {RadioBasicDemoModule} from "./basic/app.module";
import {RadioFullModule} from "./full/app.module";
import {RadioTrackItemByDemoModule} from "./track-item-by/app.module";

import {RadioFullComponent} from "./full/app.component";
import {RadioBasicDemoComponent} from "./basic/app.component";
import {RadioTrackItemByDemoComponent} from "./track-item-by/app.component";

export const routerConfig = [
    {
        path: 'full', component: RadioFullComponent, recommended: true
    },
    {
        path: 'basic', component: RadioBasicDemoComponent
    },
    {
        path: 'trackItemBy', component: RadioTrackItemByDemoComponent
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
export class RadioDemoModule { }
