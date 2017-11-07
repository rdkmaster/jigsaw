import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {BallLoadingDemoModule} from "./ball/app.module";
import {DefinedLoadingDemoModule} from "./user-defined/app.module";
import {DomInnerDemoModule} from "./dom-inner/app.module";
import {ColorfulLoadingDemoModule} from "./color/app.module";
import {LoadingFullDemoModule} from "./full/app.module";
import {BubbleLoadingDemoModule} from "./bubble/app.module";
import {FontLoadingDemoModule} from "./font-icon/app.module";

import {LoadingFullDemoComponent} from "./full/app.component";
import {BallLoadingDemoComponent} from "./ball/app.component";
import {BubbleLoadingDemoComponent} from "./bubble/app.component";
import {FontLoadingDemoComponent} from "./font-icon/app.component";
import {DefinedLoadingDemoComponent} from "./user-defined/app.component";
import {DomInnerDemoComponent} from "./dom-inner/app.component";
import {ColorfulLoadingDemoComponent} from "./color/app.component";

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
