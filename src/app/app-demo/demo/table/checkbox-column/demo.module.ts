import {NgModule} from '@angular/core';
import {JigsawButtonModule, JigsawTableModule, TableCellCheckboxRenderer, TableHeadCheckboxRenderer} from "jigsaw/public_api";
import {TableAddCheckboxColumnDemoComponent} from './demo.component';
import {DemoTemplateModule} from "../../../demo-template/demo-template";

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    imports: [JigsawTableModule, JigsawButtonModule, DemoTemplateModule, JigsawHeaderModule],
    declarations: [TableAddCheckboxColumnDemoComponent],
    exports: [TableAddCheckboxColumnDemoComponent]
})
export class TableAddCheckboxColumnDemoModule {
}
