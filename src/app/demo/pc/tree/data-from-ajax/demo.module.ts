import {NgModule} from '@angular/core';
import {JigsawTreeExtModule} from "jigsaw/public_api";
import {ZtreeDemoDataFromAjaxComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTreeExtModule, JigsawDemoDescriptionModule],
    declarations: [ZtreeDemoDataFromAjaxComponent],
    exports: [ZtreeDemoDataFromAjaxComponent]
})
export class TreeAjaxDataDemoModule {
}
