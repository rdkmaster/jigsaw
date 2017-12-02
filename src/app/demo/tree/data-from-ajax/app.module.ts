import {NgModule} from '@angular/core';
import {JigsawTreeExtModule} from "jigsaw/component/tree/tree-ext";
import {ZtreeDemoDataFromAjaxComponent} from './app.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTreeExtModule, JigsawDemoDescriptionModule],
    declarations: [ZtreeDemoDataFromAjaxComponent],
    exports: [ZtreeDemoDataFromAjaxComponent]
})
export class TreeAjaxDataDemoModule {
}
