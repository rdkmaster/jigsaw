import { NgModule } from '@angular/core';
import { JigsawInputModule } from "jigsaw/component/input/input";
import { JigsawTableModule } from "jigsaw/component/table/table";
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
