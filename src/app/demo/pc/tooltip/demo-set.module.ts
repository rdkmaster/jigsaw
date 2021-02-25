import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {PopupService} from "jigsaw/common/service/popup.service";

import {TooltipBasicDemoComponent} from "./basic/demo.component";
import {TooltipBasicDemoModule} from "./basic/demo.module";

export const routerConfig = [
    {
        path: 'basic', component: TooltipBasicDemoComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig), TooltipBasicDemoModule
    ],
    providers: [PopupService]
})
export class TooltipDemoModule {
}
