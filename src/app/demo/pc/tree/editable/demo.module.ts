import {NgModule} from '@angular/core';
import {JigsawTreeExtModule} from "jigsaw/public_api";
import {ZtreeDemoEditableComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    imports: [JigsawTreeExtModule, JigsawDemoDescriptionModule, DemoTemplateModule],
    declarations: [ZtreeDemoEditableComponent],
    exports: [ZtreeDemoEditableComponent]
})
export class TreeEditableDemoModule {
}
