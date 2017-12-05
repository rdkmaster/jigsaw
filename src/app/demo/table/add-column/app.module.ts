import {NgModule} from '@angular/core';
import {JigsawTableModule} from "jigsaw/component/table/table";
import {MyTableCellOption, MyTableHeadOption, TableAddColumnDemoComponent} from './app.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTableModule, JigsawDemoDescriptionModule],
    declarations: [TableAddColumnDemoComponent, MyTableHeadOption, MyTableCellOption],
    exports: [TableAddColumnDemoComponent],
    entryComponents: [
        MyTableHeadOption,
        MyTableCellOption,
    ],
})
export class TableAddColumnDemoModule {
}
