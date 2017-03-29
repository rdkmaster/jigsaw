import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

import {RdkButtonModule} from "../../../../component/button/button";

import {DialogDemoComponent} from "./dialog/dialog";
import {TooltipDemoComponent} from "./tooltip/tooltip";
import {RdkDialog} from '../../../../component/dialog/dialog';
import {RdkTooltip} from '../../../../component/tooltip/tooltip';
import {UseDialogComponent} from './dialog/use-dialog/use-dialog';
import {RdkDrag} from '../../../../component/drag/drag';

import {PopupService} from '../../../../core/service/popup.service';

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
        path:'**', //fallback router must in the last
        component: DialogDemoComponent
    }
];

@NgModule({
    declarations: [
        DialogDemoComponent, RdkDialog, RdkTooltip, TooltipDemoComponent, UseDialogComponent, RdkDrag
    ],
    imports: [
        RouterModule.forChild(popupDemoRoutes),
        RdkButtonModule,
        CommonModule
    ],
    exports: [
        DialogDemoComponent, TooltipDemoComponent
    ],
    providers: [PopupService],
    entryComponents: [RdkDialog, RdkTooltip, UseDialogComponent]
})
export class PopupDemoModule { }
