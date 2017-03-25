import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {SelectBasicDemoComponent} from "./basic/basic";
import {SelectScrollDemoComponent} from "./scroll/scroll";
import {SelectCheckboxDemoComponent} from "./checkbox/checkbox";
import {CommonModule} from '@angular/common';//todo 使用ng-for时需要引用

import { RdkSelectModule } from "../../../../component/select/select";
import { RdkCheckBoxModule } from "../../../../component/checkbox/index";


const selectDemoRoutes=[
    {
        path:'',
        redirectTo:'basic',
        pathMatch:'full'
    },
    {
        path:'basic', component: SelectBasicDemoComponent
    },
    {
        path:'scroll', component: SelectScrollDemoComponent
    },
    {
        path:'checkbox', component: SelectCheckboxDemoComponent
    },
    {
        path:'**', //fallback router must in the last
        component: SelectBasicDemoComponent
    }
];

@NgModule({
    declarations: [
        SelectBasicDemoComponent,SelectScrollDemoComponent,SelectCheckboxDemoComponent
    ],
    imports: [
        RouterModule.forChild(selectDemoRoutes),RdkSelectModule,CommonModule, RdkCheckBoxModule
    ],
    exports: [
        SelectBasicDemoComponent,SelectScrollDemoComponent,SelectCheckboxDemoComponent
    ],
    providers: []
})
export class SelectDemoModule { }
