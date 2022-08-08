import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawTableModule, TableCellSelectRenderer} from "jigsaw/public_api";
import {TableCellSelectRenderDemoComponent} from './demo.component';
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    imports: [JigsawTableModule, CommonModule, DemoTemplateModule],
    declarations: [TableCellSelectRenderDemoComponent],
    exports: [TableCellSelectRenderDemoComponent]
})
export class TableCellSelectRenderDemoModule {
}
