import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {PopupService} from "jigsaw/common/service/popup.service";

import {TooltipBasicDemoComponent} from "./basic/demo.component";
import {TooltipBasicDemoModule} from "./basic/demo.module";
import {TooltipHtmlDemoComponent} from "./html-renderer/demo.component";
import {TooltipHtmlDemoModule} from "./html-renderer/demo.module";
import {MovingTooltipDemoComponent} from "./moving-tooltip/demo.component";
import {MovingTooltipDemoModule} from "./moving-tooltip/demo.module";
import {TooltipShowDemoComponent} from "./programmatic-show/demo.component";
import {TooltipShowDemoModule} from "./programmatic-show/demo.module";
import { TooltipThemeDemoComponent } from './theme/demo.component';
import { TooltipThemeDemoModule } from './theme/demo.module';
import { TooltipScenesDemoComponent } from './scenes/demo.component';
import { TooltipScenesDemoModule } from './scenes/demo.module';

export const routerConfig = [
    {
        path: 'basic', component: TooltipBasicDemoComponent
    },
    {
        path: 'html-renderer', component: TooltipHtmlDemoComponent
    },
    {
        path: 'moving-tooltip', component: MovingTooltipDemoComponent
    },
    {
        path: 'programmatic-show', component: TooltipShowDemoComponent
    },
    {
        path: 'theme', component: TooltipThemeDemoComponent
    },
    {
        path: 'scenes', component: TooltipScenesDemoComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig), TooltipBasicDemoModule, TooltipHtmlDemoModule, MovingTooltipDemoModule,
        TooltipShowDemoModule, TooltipThemeDemoModule, TooltipScenesDemoModule
    ],
    providers: [PopupService]
})
export class TooltipDemoModule {
}
