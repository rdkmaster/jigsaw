import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

import {RdkButtonModule} from "../../../../component/button/button";

import {PopupDemoComponent} from "./popup";
import {InsertComponent} from './insert1/insert';
import {RdkToolTip} from './tooltip/tooltip';

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
        PopupDemoComponent, InsertComponent, RdkToolTip
    ],
    imports: [
        RouterModule.forChild(buttonDemoRoutes),
        RdkButtonModule
    ],
    exports: [
        PopupDemoComponent
    ],
    providers: [PopupService],
    entryComponents: [InsertComponent, RdkToolTip]
})
export class PopupDemoModule { }
