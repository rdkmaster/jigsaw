import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

import {RdkButtonModule} from "../../../../component/button/button";

import {DialogDemoComponent} from "./dialog/dialog";
import {TooltipDemoComponent} from "./tooltip/tooltip";
import {RdkDialog} from '../../../../component/dialog/dialog';
import {RdkTooltip} from '../../../../component/tooltip/tooltip';
import {UseDialogComponent} from './dialog/use-dialog/use-dialog';

import {PopupService} from '../../../../core/service/popup.service';

const buttonDemoRoutes=[
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
        DialogDemoComponent, RdkDialog, RdkTooltip, TooltipDemoComponent, UseDialogComponent
    ],
    imports: [
        RouterModule.forChild(buttonDemoRoutes),
        RdkButtonModule,
    ],
    exports: [
        DialogDemoComponent, TooltipDemoComponent
    ],
    providers: [PopupService],
    entryComponents: [RdkDialog, RdkTooltip, UseDialogComponent]
})
export class PopupDemoModule { }
