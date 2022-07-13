import {NgModule} from '@angular/core';
import {JigsawHeaderModule, JigsawTableModule} from "jigsaw/public_api";
import {TableContentWidthDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    imports: [JigsawTableModule, JigsawDemoDescriptionModule, JigsawHeaderModule, DemoTemplateModule],
    declarations: [TableContentWidthDemoComponent],
    exports: [TableContentWidthDemoComponent]
})
export class TableContentWidthDemoModule {
}
