import { NgModule } from '@angular/core';
import { JigsawTableModule } from "jigsaw/component/table/table";
import { TableAddColumnDemoComponent, MyTableHeadOption, MyTableCellOption }  from './app.component';

@NgModule({
    imports: [ JigsawTableModule ],
    declarations: [ TableAddColumnDemoComponent, MyTableHeadOption, MyTableCellOption ],
    bootstrap: [ TableAddColumnDemoComponent ],
    entryComponents: [
        MyTableHeadOption,
        MyTableCellOption,
    ],
})
export class TableAddColumnDemoModule {}
