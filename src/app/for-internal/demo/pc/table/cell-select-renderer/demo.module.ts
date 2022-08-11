import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawTableModule, TableCellSelectRenderer} from "jigsaw/public_api";
import {TableCellSelectRenderDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";

@NgModule({
    imports: [JigsawTableModule, CommonModule, JigsawDemoDescriptionModule],
    declarations: [TableCellSelectRenderDemoComponent],
    exports: [TableCellSelectRenderDemoComponent]
})
export class TableCellSelectRenderDemoModule {
}
