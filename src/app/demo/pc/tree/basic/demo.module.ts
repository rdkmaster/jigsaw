import {NgModule} from '@angular/core';
import {JigsawTreeExtModule} from "jigsaw/public_api";
import {ZtreeDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    imports: [JigsawTreeExtModule, JigsawDemoDescriptionModule, DemoTemplateModule],
    declarations: [ZtreeDemoComponent],
    exports: [ZtreeDemoComponent]
})
export class TreeBasicDemoModule {
}
