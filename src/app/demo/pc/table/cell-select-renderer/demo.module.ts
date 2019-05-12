import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawTableModule} from "jigsaw/pc-components/table/table";
import {TableCellSelectRenderDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TableCellSelectRenderer} from "jigsaw/pc-components/table/table-renderer";

@NgModule({
    imports: [JigsawTableModule, CommonModule, JigsawDemoDescriptionModule],
    declarations: [TableCellSelectRenderDemoComponent],
    exports: [TableCellSelectRenderDemoComponent],
    entryComponents: [
        TableCellSelectRenderer
    ]
})
export class TableCellSelectRenderDemoModule {
}
