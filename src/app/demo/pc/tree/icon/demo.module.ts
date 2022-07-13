import {NgModule} from '@angular/core';
import {JigsawTreeExtModule, JigsawHeaderModule} from "jigsaw/public_api";
import {ZTreeIconDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    imports: [JigsawTreeExtModule, JigsawDemoDescriptionModule, JigsawHeaderModule, DemoTemplateModule],
    declarations: [ZTreeIconDemoComponent],
    exports: [ZTreeIconDemoComponent]
})
export class ZTreeIconDemoModule {
}
