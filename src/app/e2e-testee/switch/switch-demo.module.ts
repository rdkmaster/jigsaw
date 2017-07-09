import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {SwitchBasicDemoComponent} from "./basic/basic";

import { JigsawSwitchModule } from "jigsaw/component/switch/index";


const inputDemoRoutes=[
    {
        path:'',
        redirectTo:'basic',
        pathMatch:'full'
    },
    {
        path:'basic', component: SwitchBasicDemoComponent
    },
    {
        path:'**', //fallback router must in the last
        component: SwitchBasicDemoComponent
    }
];

@NgModule({
    declarations: [
        SwitchBasicDemoComponent
    ],
    imports: [
        RouterModule.forChild(inputDemoRoutes), JigsawSwitchModule
    ],
    exports: [
        SwitchBasicDemoComponent
    ],
    providers: []
})
export class SwitchDemoModule { }
