import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {RadioFullModule} from "./full/demo.module";
import {RadioTrackItemByDemoModule} from "./track-item-by/demo.module";

import {RadioFullComponent} from "./full/demo.component";
import {RadioTrackItemByDemoComponent} from "./track-item-by/demo.component";
import {RadioAllComponent} from "./all/demo.component";
import {JigsawMarkdownModule} from "../../../markdown/markdown";
import {CommonModule} from "@angular/common";
import {RadioBasicDemoModule} from "./basic/demo.module";
import {RadioDataIsObjectDemoModule} from "./object/demo.module";
import {RadioDataIsStringArrayDemoModule} from "./string-array/demo.module";
import {RadioComplexSceneDemoModule} from "./complex-scene/demo.module";

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
        JigsawMarkdownModule,
        CommonModule,
        RadioBasicDemoModule,
        RadioDataIsObjectDemoModule,
        RadioDataIsStringArrayDemoModule,
        RadioComplexSceneDemoModule
    ],
    declarations: [RadioAllComponent]
})
export class RadioDemoModule { }
