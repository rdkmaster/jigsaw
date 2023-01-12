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
import { UploadFallbackDemoComponent } from "./upload-fallback/demo.component";
import { UploadFallbackDemoModule } from "./upload-fallback/demo.module";


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
        path: 'get-file-urls', component: UploadGetFileUrlsComponent
    },
    {
        path: 'upload-fallback', component: UploadFallbackDemoComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        UploadBasicDemoModule, UploadResultDemoModule, UploadContentFieldDemoModule, UploadAutoUploadDemoModule,
        UploadChangeTargetUrlDemoModule, UploadDirectiveDemoModule, UploadGetFileUrlsModule, UploadFallbackDemoModule
    ]
})
export class UploadDemoModule {
}
