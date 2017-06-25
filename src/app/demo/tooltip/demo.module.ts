import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {PopupService} from "../../../rdk/service/popup.service";
import {RdkTooltipModule} from "../../../rdk/component/tooltip/tooltip";
import {TooltipInDomDemoComponent} from "./in-dom/demo";
import {TooltipDialogDemoComponent} from "./dialog/demo";
import {RdkButtonModule} from "../../../rdk/component/button/button";
import {UserTooltipDialogComponent} from "./dialog/user-defined-tooltip-dialog";
import {SimpleTooltipDemoComponent} from "./simple-tooltip/demo";
import {RdkInputModule} from "../../../rdk/component/input/input";


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
    declarations: [
        TooltipInDomDemoComponent, TooltipDialogDemoComponent, UserTooltipDialogComponent,
        SimpleTooltipDemoComponent
    ],
    imports: [
        RouterModule.forChild(popupDemoRoutes),
        RdkTooltipModule, RdkButtonModule, RdkInputModule
    ],
    providers: [PopupService],
    entryComponents: [
        UserTooltipDialogComponent
    ]
})
export class TooltipDemoModule {
}
