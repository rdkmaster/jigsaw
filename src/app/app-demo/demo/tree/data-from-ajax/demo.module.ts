import {NgModule} from '@angular/core';
import {JigsawTreeExtModule} from "jigsaw/public_api";
import {ZtreeDemoDataFromAjaxComponent} from './demo.component';

import {DemoTemplateModule} from "../../demo-template/demo-template";

@NgModule({
    imports: [JigsawTreeExtModule,  DemoTemplateModule],
    declarations: [ZtreeDemoDataFromAjaxComponent],
    exports: [ZtreeDemoDataFromAjaxComponent]
})
export class TreeAjaxDataDemoModule {
}
