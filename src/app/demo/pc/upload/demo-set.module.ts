import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {uploadDemoComponent} from "./basic/demo.component";
import {UploadBasicDemoModule} from "./basic/demo.module";

export const routerConfig = [
    {
        path: 'basic', component: uploadDemoComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        UploadBasicDemoModule
    ]
})
export class UploadDemoModule {
}
