import {NgModule} from '@angular/core';
import {JigsawTableModule} from "jigsaw/component/table/table";
import {TableAddCheckboxColumnDemoComponent, TableCellObjectRenderer} from './app.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTableModule, JigsawDemoDescriptionModule],
    declarations: [TableAddCheckboxColumnDemoComponent, TableCellObjectRenderer],
    bootstrap: [TableAddCheckboxColumnDemoComponent],
    entryComponents: [TableCellObjectRenderer]
})
export class TableAddCheckboxColumnDemoModule {
}
