import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {RadioBasicDemoComponent} from "./basic/basic";
import {CommonModule} from '@angular/common';//todo 使用ng-for时需要引用
import { RdkRadioModule } from "../../../../component/radio/radio";

const inputDemoRoutes=[
    {
        path:'',
        redirectTo:'basic',
        pathMatch:'full'
    },
    {
        path:'basic', component: RadioBasicDemoComponent
    },
    {
        path:'**', //fallback router must in the last
        component: RadioBasicDemoComponent
    }
];

@NgModule({
    declarations: [
        RadioBasicDemoComponent
    ],
    imports: [
        RouterModule.forChild(inputDemoRoutes), RdkRadioModule,CommonModule
    ],
    exports: [
        RadioBasicDemoComponent
    ],
    providers: []
})
export class RadioDemoModule { }
