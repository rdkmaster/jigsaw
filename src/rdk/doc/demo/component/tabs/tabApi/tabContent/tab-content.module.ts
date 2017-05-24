import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {TabContentComponent} from "./tabContent";
import {RdkButtonModule} from "../../../../../../component/button/button";
import {RdkInputModule} from "../../../../../../component/input/input";

const routes=[
    {
        path:'', component: TabContentComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        RdkButtonModule,
        RdkInputModule
    ],
    declarations: [
        TabContentComponent
    ]
})
export class TabContentModule { }
