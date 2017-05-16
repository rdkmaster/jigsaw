import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

import {RdkButtonModule} from "../../../../component/button/button";

import {DialogDemoComponent} from "./dialog/dialog";
import {TooltipDemoComponent} from "./tooltip/tooltip";
import {RdkDialog} from "../../../../component/dialog/dialog";
import {RdkTooltip} from "../../../../component/tooltip/tooltip";
import {UseDialogComponent} from "./dialog/use-dialog/use-dialog";
import {UseDialog2Component} from "./dialog/use-dialog2/use-dialog";
import {UseTooltipComponent} from "./tooltip/use-tooltip/use-tooltip";

import {PopupService} from "../../../../service/popup.service";
import {RdkAlertModule, RdkErrorAlert, RdkInfoAlert, RdkWarningAlert} from "../../../../component/alert/alert";
import {AlertDemoComponent} from "./alert/alert";

import {CustomizedAlert} from "./alert/customized-alert/customized-alert";
import {RdkBlock} from "../../../../component/block/block";
const popupDemoRoutes = [
    {
        path: '',
        redirectTo: 'dialog',
        pathMatch: 'full'
    },
    {
        path: 'dialog', component: DialogDemoComponent
    },
    {
        path: 'tooltip', component: TooltipDemoComponent
    },
    {
        path: 'alert', component: AlertDemoComponent
    },
    {
        path: '**', //fallback router must in the last
        component: DialogDemoComponent
    }
];

@NgModule({
    declarations: [
        RdkBlock,
        RdkTooltip,
        DialogDemoComponent,
        UseDialogComponent,
        UseDialog2Component,
        TooltipDemoComponent,
        UseTooltipComponent,
        AlertDemoComponent,
        CustomizedAlert,
    ],
    imports: [
        RouterModule.forChild(popupDemoRoutes),
        CommonModule,
        RdkAlertModule,
        RdkButtonModule
    ],
    providers: [PopupService],
    entryComponents: [
        RdkBlock,
        RdkDialog,
        RdkTooltip,
        UseDialogComponent,
        UseDialog2Component,
        UseTooltipComponent,
        RdkInfoAlert,
        RdkWarningAlert,
        RdkErrorAlert,
        CustomizedAlert,
    ]
})
export class PopupDemoModule {
}
