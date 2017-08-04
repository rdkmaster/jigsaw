import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {PopupService} from "jigsaw/service/popup.service";

import {TooltipDialogDemoComponent} from "./dialog/app.component";
import {TooltipDialogDemoModule} from "./dialog/app.module";

import {TooltipInDomDemoComponent} from "./in-dom/app.component";
import {TooltipInDomDemoModule} from "./in-dom/app.module";

import {SimpleTooltipDemoComponent} from "./inline/app.component";
import {SimpleTooltipDemoModule} from "./inline/app.module";


const popupDemoRoutes = [
    {
        path: 'in-dom', component: TooltipInDomDemoComponent
    },
    {
        path: 'dialog', component: TooltipDialogDemoComponent
    },
    {
        path: 'inline', component: SimpleTooltipDemoComponent
    },
    {
        path: '**', //fallback router must in the last
        component: TooltipInDomDemoComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(popupDemoRoutes),
        TooltipDialogDemoModule, TooltipInDomDemoModule, SimpleTooltipDemoModule
    ],
    providers: [PopupService]
})
export class TooltipDemoModule {
}
