import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {TabContentDefine} from "./tabContent";
import {RdkButtonModule} from "../../../../../../component/button/button";
import {RdkInputModule} from "../../../../../../component/input/input";

const routes=[
    {
        path:'', component: TabContentDefine
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        RdkButtonModule,
        RdkInputModule
    ],
    exports: [TabContentDefine],
    declarations: [
        TabContentDefine
    ]
})
export class TabContentModule { }
