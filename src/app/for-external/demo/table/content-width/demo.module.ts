import {NgModule} from '@angular/core';
import {JigsawHeaderModule, JigsawTableModule} from "jigsaw/public_api";
import {TableContentWidthDemoComponent} from './demo.component';

import {DemoTemplateModule} from "../../demo-template/demo-template";

@NgModule({
    imports: [JigsawTableModule,  JigsawHeaderModule, DemoTemplateModule],
    declarations: [TableContentWidthDemoComponent],
    exports: [TableContentWidthDemoComponent]
})
export class TableContentWidthDemoModule {
}
