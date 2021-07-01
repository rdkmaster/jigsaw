import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {
    JigsawTableModule, TableCellCheckboxRenderer, TableHeadCheckboxRenderer, JigsawPaginationModule,
    JigsawTagModule, JigsawButtonModule
} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TableAddCheckboxColumnPageableDemoComponent} from './demo.component';

@NgModule({
    imports: [JigsawTableModule, JigsawPaginationModule, JigsawTagModule, JigsawDemoDescriptionModule, CommonModule, JigsawButtonModule],
    declarations: [TableAddCheckboxColumnPageableDemoComponent],
    exports: [TableAddCheckboxColumnPageableDemoComponent]
})
export class TableAddCheckboxColumnPageableDemoModule {
}
