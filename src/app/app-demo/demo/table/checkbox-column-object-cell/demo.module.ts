import {NgModule} from '@angular/core';
import {JigsawTableModule, TableCellCheckboxRenderer, TableHeadCheckboxRenderer} from "jigsaw/public_api";
import {TableCheckboxColumnObjectCellDemoComponent, TableCellObjectRenderer} from './demo.component';
import {DemoTemplateModule} from "../../demo-template/demo-template";

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    imports: [JigsawTableModule, DemoTemplateModule, JigsawHeaderModule],
    declarations: [TableCheckboxColumnObjectCellDemoComponent, TableCellObjectRenderer],
    exports: [TableCheckboxColumnObjectCellDemoComponent]
})
export class TableCheckboxColumnObjectCellDemoModule {
}
