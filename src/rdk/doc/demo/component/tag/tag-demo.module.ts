import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {TagBasicDemoComponent} from "./basic/basic";
import {TagGroupDemoComponent} from "./tag-group/tag-group";

import {RdkTagModule} from "../../../../component/tag/tag";


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
        path: 'tag-group', component: TagGroupDemoComponent
    },
    {
        path: '**', //fallback router must in the last
        component: TagBasicDemoComponent
    }
];

@NgModule({
    declarations: [
        TagBasicDemoComponent, TagGroupDemoComponent
    ],
    imports: [
        RouterModule.forChild(TagDemoRoutes), RdkTagModule
    ],
    exports: [
        TagBasicDemoComponent, TagGroupDemoComponent
    ],
    providers: []
})
export class TagDemoModule {
}
