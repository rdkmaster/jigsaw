import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {UploadBasicDemoComponent} from "./basic/demo.component";
import {UploadBasicDemoModule} from "./basic/demo.module";
import { UploadPanelDemoComponent } from './upload-panel/demo.component';
import { UploadPanelDemoModule } from './upload-panel/demo.module';


export const routerConfig = [
    {
        path: 'basic', component: UploadBasicDemoComponent
    },
    {
        path: 'upload-panel', component: UploadPanelDemoComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        UploadBasicDemoModule, UploadPanelDemoModule
    ]
}) 
export class UploadDemoModule {
}
