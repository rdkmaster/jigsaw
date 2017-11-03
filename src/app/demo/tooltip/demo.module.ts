import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {PopupService} from "jigsaw/service/popup.service";
import {TooltipDialogDemoModule} from "./dialog/app.module";
import {TooltipInDomDemoModule} from "./in-dom/app.module";
import {SimpleTooltipDemoModule} from "./inline/app.module";

import {TooltipInDomDemoComponent} from "./in-dom/app.component";
import {TooltipDialogDemoComponent} from "./dialog/app.component";
import {SimpleTooltipDemoComponent} from "./inline/app.component";

export const routerConfig = [
    {
        path: 'in-dom', component: TooltipInDomDemoComponent
    },
    {
        path: 'dialog', component: TooltipDialogDemoComponent
    },
    {
        path: 'inline', component: SimpleTooltipDemoComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        TooltipDialogDemoModule, TooltipInDomDemoModule, SimpleTooltipDemoModule
    ],
    providers: [PopupService]
})
export class TooltipDemoModule {
}
