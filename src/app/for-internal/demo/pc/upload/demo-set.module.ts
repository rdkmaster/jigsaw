import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {UploadBasicDemoComponent} from "./basic/demo.component";
import {UploadBasicDemoModule} from "./basic/demo.module";
import { UploadResultDemoComponent } from './upload-result/demo.component';
import { UploadResultDemoModule } from './upload-result/demo.module';
import { UploadContentFieldDemoComponent } from './content-field/demo.component';
import { UploadContentFieldDemoModule } from './content-field/demo.module';
import { UploadAutoUploadDemoModule } from './toggle-auto-upload/demo.module';
import { UploadAutoUploadDemoComponent } from './toggle-auto-upload/demo.component';
import { ChangeTargetUrlDemoComponent } from './change-target-url/demo.component';
import { UploadChangeTargetUrlDemoModule } from './change-target-url/demo.module';
import { UploadDirectiveDemoComponent } from './directive/demo.component';
import { UploadDirectiveDemoModule } from './directive/demo.module';
import {UploadGetFileUrlsComponent} from "./get-file-urls/demo.component";
import {UploadGetFileUrlsModule} from "./get-file-urls/demo.module";
import {UploadDirectiveErrorDemoComponent} from "./directive-error/demo.component";
import {UploadDirectiveErrorDemoModule} from "./directive-error/demo.module";


export const routerConfig = [
    {
        path: 'basic', component: UploadBasicDemoComponent
    },
    {
        path: 'content-field', component: UploadContentFieldDemoComponent
    },
    {
        path: 'upload-result', component: UploadResultDemoComponent
    },
    {
        path: 'toggle-auto-upload', component: UploadAutoUploadDemoComponent
    },
    {
        path: 'change-target-url', component: ChangeTargetUrlDemoComponent
    },
    {
        path: 'directive', component: UploadDirectiveDemoComponent
    },
    {
        path: "get-directive-error", component: UploadDirectiveErrorDemoComponent
    },
    {
        path: 'get-file-urls', component: UploadGetFileUrlsComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        UploadBasicDemoModule, UploadResultDemoModule, UploadContentFieldDemoModule, UploadAutoUploadDemoModule,
        UploadChangeTargetUrlDemoModule, UploadDirectiveDemoModule, UploadGetFileUrlsModule, UploadDirectiveErrorDemoModule
    ]
})
export class UploadDemoModule {
}
