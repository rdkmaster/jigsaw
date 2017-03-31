

import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {TagBasicDemoComponent} from "./basic/basic";

import {RdkTagModule} from "../../../../component/tag/tag";


const TagDemoRoutes=[
    {
        path:'',
        redirectTo:'basic',
        pathMatch:'full'
    },
    {
        path:'basic', component: TagBasicDemoComponent
    },
    {
        path:'**', //fallback router must in the last
        component: TagBasicDemoComponent
    }
];

@NgModule({
    declarations: [
        TagBasicDemoComponent
    ],
    imports: [
        RouterModule.forChild(TagDemoRoutes), RdkTagModule
    ],
    exports: [
        TagBasicDemoComponent
    ],
    providers: []
})
export class TagDemoModule { }
