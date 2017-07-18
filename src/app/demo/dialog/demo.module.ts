import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {DialogTitleDemo} from "./title/app.component";
import {DialogButtonsDemo} from "./buttons/app.component";
import {DialogTopDemo} from "./top/app.component";
import {DialogPopOptionDemo} from "./popupOption/app.component";
import {DialogInDomDemoComponent} from "./in-dom/app.component";
import {DialogMiscDemoComponent} from "./misc/app.component";
import {DialogButtonsDemoModule} from "./buttons/app.module";
import {DialogInDomDemoModule} from "./in-dom/app.module";
import {DialogMiscDemoModule} from "./misc/app.module";
import {DialogPopOptionDemoModule} from "./popupOption/app.module";
import {DialogTitleDemoModule} from "./title/app.module";
import {DialogTopDemoModule} from "./top/app.module";


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
    imports: [
        RouterModule.forChild(dialogDemoRoutes),
        DialogButtonsDemoModule,
        DialogInDomDemoModule,
        DialogMiscDemoModule,
        DialogPopOptionDemoModule,
        DialogTitleDemoModule,
        DialogTopDemoModule
    ]
})
export class DialogDemoModule { }
