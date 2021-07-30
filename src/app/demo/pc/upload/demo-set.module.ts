import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {UploadBasicDemoComponent} from "./basic/demo.component";
import {UploadBasicDemoModule} from "./basic/demo.module";
import { UploadResultDemoComponent } from './upload-result/demo.component';
import { UploadResultDemoModule } from './upload-result/demo.module';
import { UploadContentFieldDemoComponent } from './content-field/demo.component';
import { UploadContentFieldDemoModule } from './content-field/demo.module';
import { UploadShowDateDemoModule } from './show-date/demo.module';
import { UploadShowDateDemoComponent } from './show-date/demo.component';
import { UploadAutoUploadDemoModule } from './auto-upload/demo.module';
import { UploadAutoUploadDemoComponent } from './auto-upload/demo.component';


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
        path: 'auto-upload', component: UploadAutoUploadDemoComponent
    },
    {
        path: 'show-date', component: UploadShowDateDemoComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        UploadBasicDemoModule, UploadResultDemoModule, UploadContentFieldDemoModule, UploadAutoUploadDemoModule,
        UploadShowDateDemoModule
    ]
})
export class UploadDemoModule {
}
