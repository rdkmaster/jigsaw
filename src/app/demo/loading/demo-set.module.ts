import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {BallLoadingDemoModule} from "./ball/demo.module";
import {DefinedLoadingDemoModule} from "./user-defined/demo.module";
import {DomInnerDemoModule} from "./dom-inner/demo.module";
import {ColorfulLoadingDemoModule} from "./color/demo.module";
import {LoadingFullDemoModule} from "./full/demo.module";
import {BubbleLoadingDemoModule} from "./bubble/demo.module";
import {FontLoadingDemoModule} from "./font-icon/demo.module";

import {LoadingFullDemoComponent} from "./full/demo.component";
import {BallLoadingDemoComponent} from "./ball/demo.component";
import {BubbleLoadingDemoComponent} from "./bubble/demo.component";
import {FontLoadingDemoComponent} from "./font-icon/demo.component";
import {DefinedLoadingDemoComponent} from "./user-defined/demo.component";
import {DomInnerDemoComponent} from "./dom-inner/demo.component";
import {ColorfulLoadingDemoComponent} from "./color/demo.component";

export const routerConfig = [
    {
        path: 'full', component: LoadingFullDemoComponent
    },
    {
        path: 'ball', component: BallLoadingDemoComponent
    },
    {
        path: 'bubble', component: BubbleLoadingDemoComponent
    },
    {
        path: 'font-icon', component: FontLoadingDemoComponent
    },
    {
        path: 'user-defined', component: DefinedLoadingDemoComponent
    },
    {
        path: 'dom-inner', component: DomInnerDemoComponent
    },
    {
        path: 'color', component: ColorfulLoadingDemoComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        LoadingFullDemoModule,
        BallLoadingDemoModule,
        BubbleLoadingDemoModule,
        FontLoadingDemoModule,
        DefinedLoadingDemoModule,
        DomInnerDemoModule,
        ColorfulLoadingDemoModule,
    ]
})
export class LoadingDemoModule {
}
