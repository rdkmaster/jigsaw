import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {PopupService} from "jigsaw/common/service/popup.service";

import {TooltipBasicDemoComponent} from "./basic/demo.component";
import {TooltipBasicDemoModule} from "./basic/demo.module";
import {TooltipHtmlDemoComponent} from "./html-renderer/demo.component";
import {TooltipHtmlDemoModule} from "./html-renderer/demo.module";
import {MovingTooltipDemoComponent} from "./moving-tooltip/demo.component";
import {MovingTooltipDemoModule} from "./moving-tooltip/demo.module";
import {TooltipTriggerDemoComponent} from "./trigger/demo.component";
import {TooltipTriggerDemoModule} from "./trigger/demo.module";
import { TooltipThemeDemoComponent } from './theme/demo.component';
import { TooltipThemeDemoModule } from './theme/demo.module';
import { TooltipScenesDemoComponent } from './scenes/demo.component';
import { TooltipScenesDemoModule } from './scenes/demo.module';
import { TooltipWordBreakDemoComponent } from "./word-break/demo.component";
import { TooltipWordBreakDemoModule } from "./word-break/demo.module";

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
        path: 'trigger', component: TooltipTriggerDemoComponent
    },
    {
        path: 'theme', component: TooltipThemeDemoComponent
    },
    {
        path: 'scenes', component: TooltipScenesDemoComponent
    },
    {
        path: 'word-break', component: TooltipWordBreakDemoComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig), TooltipBasicDemoModule, TooltipHtmlDemoModule, MovingTooltipDemoModule,
        TooltipTriggerDemoModule, TooltipThemeDemoModule, TooltipScenesDemoModule, TooltipWordBreakDemoModule
    ],
    providers: [PopupService]
})
export class TooltipDemoModule {
}
