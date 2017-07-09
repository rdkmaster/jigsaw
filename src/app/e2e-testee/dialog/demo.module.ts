import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {DialogTitleDemo} from "./title/title";
import {JigsawDialogModule} from "jigsaw/component/dialog/dialog";
import {DialogButtonsDemo} from "./buttons/buttons";
import {DialogTopDemo} from "./top/top";
import {DialogPopOptionDemo} from "./popupOption/popUpOption";
import {CommonModule} from "@angular/common";
import {DialogInDomDemoComponent} from "./in-dom/demo";
import {DialogMiscDemoComponent} from "./misc/dialog";
import {UserDialogComponent} from "./misc/user-dialog/user-dialog";
import {UserDialog2Component} from "./misc/user-dialog2/user-dialog";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {JigsawSwitchModule} from "jigsaw/component/switch/index";
import {JigsawRadioModule} from "jigsaw/component/radio/radio";
import {JigsawInputModule} from "jigsaw/component/input/input";
import {PopupService} from "jigsaw/service/popup.service";


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
        RouterModule.forChild(dialogDemoRoutes),CommonModule,JigsawButtonModule,
        JigsawInputModule,JigsawDialogModule,JigsawSwitchModule,JigsawRadioModule
    ],
    providers: [PopupService],
    entryComponents:[UserDialogComponent,UserDialog2Component]
})
export class DialogDemoModule { }
