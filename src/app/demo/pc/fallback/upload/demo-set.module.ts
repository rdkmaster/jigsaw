import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {UploadBasicDemoComponent} from "./basic/demo.component";
import {UploadBasicDemoModule} from "./basic/demo.module";
import {UploadContentFieldDemoComponent} from "./content-field/demo.component";
import {UploadContentFieldDemoModule} from "./content-field/demo.module";

export const routerConfig = [
    {
        path: 'basic', component: UploadBasicDemoComponent
    },
    {
        path: 'content-field', component: UploadContentFieldDemoComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        UploadBasicDemoModule, UploadContentFieldDemoModule
    ]
})
export class UploadFallbackDemoModule {
}
