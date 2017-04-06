import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

import {RdkButtonModule} from "../../../../component/button/button";

import {DialogDemoComponent} from "./dialog/dialog";
import {TooltipDemoComponent} from "./tooltip/tooltip";
import {RdkDialog} from '../../../../component/dialog/dialog';
import {RdkTooltip} from '../../../../component/tooltip/tooltip';
import {UseDialogComponent} from './dialog/use-dialog/use-dialog';
import {UseDialog2Component} from './dialog/use-dialog2/use-dialog';
import {RdkDraggable} from '../../../../component/draggable/draggable';
import {UseTooltipComponent} from './tooltip/use-tooltip/use-tooltip';

import {PopupService} from '../../../../service/popup.service';
import {RdkAlert} from "../../../../component/alert/alert";
import {AlertDemoComponent} from "./alert/alert";

import {InfoAlert} from "./alert/use-alert-default/info-alert";
import {WarningAlert} from './alert/use-alert-default/warning-alert';
import {ErrorAlert} from './alert/use-alert-default/error-alert';
import {UserAlertComponentConfig} from './alert/use-alert-config/alert-config';
const popupDemoRoutes=[
    {
        path:'',
        redirectTo:'dialog',
        pathMatch:'full'
    },
    {
        path:'dialog', component: DialogDemoComponent
    },
    {
        path:'tooltip', component: TooltipDemoComponent
    },
    {
        path:'alert', component: AlertDemoComponent
    },
    {
        path:'**', //fallback router must in the last
        component: DialogDemoComponent
    }
];

@NgModule({
    declarations: [
        RdkDialog,
        UseDialogComponent,
        UseDialog2Component,
        DialogDemoComponent,
        RdkDraggable,
        RdkTooltip,
        UseTooltipComponent,
        TooltipDemoComponent,
        RdkAlert,
        InfoAlert,
        WarningAlert,
        ErrorAlert,
        UserAlertComponentConfig,
        AlertDemoComponent
    ],
    imports: [
        RouterModule.forChild(popupDemoRoutes),
        RdkButtonModule,
        CommonModule
    ],
    exports: [
        DialogDemoComponent, TooltipDemoComponent,AlertDemoComponent
    ],
    providers: [PopupService],
    entryComponents: [RdkDialog, UseDialogComponent, UseDialog2Component,RdkTooltip, UseTooltipComponent,RdkAlert,InfoAlert,WarningAlert,
        ErrorAlert,UserAlertComponentConfig]
})
export class PopupDemoModule { }
