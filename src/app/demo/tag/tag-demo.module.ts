import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

import {TagBasicDemoComponent} from "./basic/app.component";
import {TagBasicDemoModule} from "./basic/app.module";


const TagDemoRoutes = [
    {
        path: '',
        redirectTo: 'basic',
        pathMatch: 'full'
    },
    {
        path: 'basic', component: TagBasicDemoComponent
    },
    {
        path: '**', //fallback router must in the last
        component: TagBasicDemoComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(TagDemoRoutes), TagBasicDemoModule
    ]
})
export class TagDemoModule {
}
