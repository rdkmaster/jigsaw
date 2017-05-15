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


const dialogDemoRoutes=[
    {
        path:'',
        redirectTo:'basic',
        pathMatch:'full'
    },{
        path: 'title', component:DialogTitleDemo
    },{
        path: 'buttons', component:DialogButtonsDemo
    },{
        path: 'top', component:DialogTopDemo
    },{
        path :'popOption', component : DialogPopOptionDemo
    }
];

@NgModule({
    declarations: [
        DialogTitleDemo,DialogButtonsDemo,DialogTopDemo,DialogPopOptionDemo
    ],
    imports: [
        RouterModule.forChild(dialogDemoRoutes),RdkButtonModule,RdkDialogModule,RdkSwitchModule,RdkRadioModule,
        RdkInputModule,CommonModule
    ],
    providers: [PopupService]
})
export class DialogDemoModule { }
