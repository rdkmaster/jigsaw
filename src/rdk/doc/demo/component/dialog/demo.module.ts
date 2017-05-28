import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {PopupService} from "../../../../service/popup.service";
import {DialogTitleDemo} from "./title/title";
import {RdkButtonModule} from "../../../../component/button/button";
import {RdkDialogModule} from "rdk/component/dialog/dialog";
import {DialogButtonsDemo} from "./buttons/buttons";
import {DialogTopDemo} from "./top/top";
import {RdkSwitchModule} from "../../../../component/switch/index";
import {DialogPopOptionDemo} from "./popupOption/popUpOption";
import {RdkRadioModule} from "../../../../component/radio/radio";
import {RdkInputModule} from "../../../../component/input/input";
import {CommonModule} from "@angular/common";
import {DialogInDomDemoComponent} from "./in-dom/demo";
import {DialogMiscDemoComponent} from "./misc/dialog";
import {UserDialogComponent} from "./misc/user-dialog/user-dialog";
import {UserDialog2Component} from "./misc/user-dialog2/user-dialog";


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
        RouterModule.forChild(dialogDemoRoutes),RdkButtonModule,RdkDialogModule,RdkSwitchModule,RdkRadioModule,
        RdkInputModule,CommonModule
    ],
    providers: [PopupService],
    entryComponents:[UserDialogComponent,UserDialog2Component]
})
export class DialogDemoModule { }
