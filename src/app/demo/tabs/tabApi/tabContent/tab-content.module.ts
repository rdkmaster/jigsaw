import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {TabContentComponent} from "./tabContent";
import {RdkButtonModule} from "../../../../../rdk/component/button/button";
import {RdkInputModule} from "../../../../../rdk/component/input/input";

const routes=[
    {
        path:'', component: TabContentComponent, outlet: 'tabPage'
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
