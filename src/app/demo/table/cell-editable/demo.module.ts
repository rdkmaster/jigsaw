import { NgModule } from '@angular/core';
import { JigsawInputModule } from "jigsaw/pc-components/input/input";
import { JigsawTableModule } from "jigsaw/pc-components/table/table";
import { TableSetCellEditableDemoComponent, MyTableCell, MyTableCellEditor }  from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [ JigsawTableModule, JigsawInputModule, JigsawDemoDescriptionModule ],
    declarations: [ TableSetCellEditableDemoComponent, MyTableCell, MyTableCellEditor ],
    exports: [ TableSetCellEditableDemoComponent ],
    entryComponents: [
        MyTableCell, MyTableCellEditor
    ],
})
export class TableSetCellEditableDemoModule {}
