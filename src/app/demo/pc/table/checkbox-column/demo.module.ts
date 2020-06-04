import {NgModule} from '@angular/core';
import {JigsawTableModule, TableCellCheckboxRenderer, TableHeadCheckboxRenderer} from "jigsaw/public_api";
import {TableAddCheckboxColumnDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTableModule, JigsawDemoDescriptionModule],
    declarations: [TableAddCheckboxColumnDemoComponent],
    exports: [TableAddCheckboxColumnDemoComponent],
    entryComponents: [TableCellCheckboxRenderer, TableHeadCheckboxRenderer]
})
export class TableAddCheckboxColumnDemoModule {
}
