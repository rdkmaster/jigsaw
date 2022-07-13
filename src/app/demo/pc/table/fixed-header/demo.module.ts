import {NgModule} from '@angular/core';
import {JigsawHeaderModule, JigsawTableModule} from "jigsaw/public_api";
import {TableFixedHeadDemoComponent} from './demo.component';
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    imports: [JigsawTableModule, DemoTemplateModule, JigsawHeaderModule],
    declarations: [TableFixedHeadDemoComponent],
    exports: [TableFixedHeadDemoComponent]
})
export class TableFixedHeadDemoModule {
}
