import {NgModule} from '@angular/core';
import {JigsawTableModule} from "jigsaw/public_api";
import {MyTableCellOption, MyTableHeadOption, TableAddColumnDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTableModule, JigsawDemoDescriptionModule],
    declarations: [TableAddColumnDemoComponent, MyTableHeadOption, MyTableCellOption],
    exports: [TableAddColumnDemoComponent]
})
export class TableAddColumnDemoModule {
}
