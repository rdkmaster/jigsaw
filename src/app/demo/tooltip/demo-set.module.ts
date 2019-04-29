import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {PopupService} from "jigsaw/common/service/popup.service";
import {TooltipDialogDemoModule} from "./dialog/demo.module";
import {TooltipInDomDemoModule} from "./in-dom/demo.module";
import {SimpleTooltipDemoModule} from "./inline/demo.module";

import {TooltipInDomDemoComponent} from "./in-dom/demo.component";
import {TooltipDialogDemoComponent} from "./dialog/demo.component";
import {SimpleTooltipDemoComponent} from "./inline/demo.component";

export const routerConfig = [
    {
        path: 'inline', component: SimpleTooltipDemoComponent
    },
    {
        path: 'in-dom', component: TooltipInDomDemoComponent
    },
    {
        path: 'dialog', component: TooltipDialogDemoComponent
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
