import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {DialogTitleDemo} from "./title/title";
import {RdkDialogModule} from "rdk/component/dialog/dialog";
import {DialogButtonsDemo} from "./buttons/buttons";
import {DialogTopDemo} from "./top/top";
import {DialogPopOptionDemo} from "./popupOption/popUpOption";
import {CommonModule} from "@angular/common";
import {DialogInDomDemoComponent} from "./in-dom/demo";
import {DialogMiscDemoComponent} from "./misc/dialog";
import {UserDialogComponent} from "./misc/user-dialog/user-dialog";
import {UserDialog2Component} from "./misc/user-dialog2/user-dialog";
import {RdkButtonModule} from "../../../rdk/component/button/button";
import {RdkSwitchModule} from "../../../rdk/component/switch/index";
import {RdkRadioModule} from "../../../rdk/component/radio/radio";
import {RdkInputModule} from "../../../rdk/component/input/input";
import {PopupService} from "../../../rdk/service/popup.service";


const dialogDemoRoutes=[
    {
        path: 'title', component:DialogTitleDemo
    },{
        path: 'buttons', component:DialogButtonsDemo
    },{
        path: 'top', component:DialogTopDemo
    },{
        path :'popOption', component : DialogPopOptionDemo
    },{
        path :'in-dom', component : DialogInDomDemoComponent
    },{
        path :'misc', component : DialogMiscDemoComponent
    }
];

@NgModule({
    declarations: [
        DialogTitleDemo,DialogButtonsDemo,DialogTopDemo,DialogPopOptionDemo,
        DialogInDomDemoComponent,DialogMiscDemoComponent,
        UserDialogComponent,UserDialog2Component,
    ],
    imports: [
        RouterModule.forChild(dialogDemoRoutes),CommonModule,RdkButtonModule,
        RdkInputModule,RdkDialogModule,RdkSwitchModule,RdkRadioModule
    ],
    providers: [PopupService],
    entryComponents:[UserDialogComponent,UserDialog2Component]
})
export class DialogDemoModule { }
