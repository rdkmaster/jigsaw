import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

import {RdkButtonModule} from "../../../../component/button/button";

import {PopupDemoComponent} from "./popup";
import {InsertComponent} from './modal/modal';
import {RdkTooltip} from './tooltip/tooltip';

import {PopupService} from '../../../../core/service/popup.service';

const buttonDemoRoutes=[
    {
        path:'',
        redirectTo:'modal',
        pathMatch:'full'
    },
    {
        path:'modal', component: PopupDemoComponent
    },
    {
        path:'**', //fallback router must in the last
        component: PopupDemoComponent
    }
];

@NgModule({
    declarations: [
        PopupDemoComponent, InsertComponent, RdkTooltip
    ],
    imports: [
        RouterModule.forChild(buttonDemoRoutes),
        RdkButtonModule
    ],
    exports: [
        PopupDemoComponent
    ],
    providers: [PopupService],
    entryComponents: [InsertComponent, RdkTooltip]
})
export class PopupDemoModule { }
