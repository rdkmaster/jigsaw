import { NgModule } from '@angular/core';
import { JigsawInputModule } from "jigsaw/component/input/input";
import { JigsawTableModule } from "jigsaw/component/table/table";
import { TableSetCellEditableDemoComponent, MyTableCell, MyTableCellEditor }  from './app.component';

@NgModule({
    imports: [ JigsawTableModule, JigsawInputModule ],
    declarations: [ TableSetCellEditableDemoComponent, MyTableCell, MyTableCellEditor ],
    bootstrap: [ TableSetCellEditableDemoComponent ],
    entryComponents: [
        MyTableCell, MyTableCellEditor
    ],
})
export class TableSetCellEditableDemoModule {}
