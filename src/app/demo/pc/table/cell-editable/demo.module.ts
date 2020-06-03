import {NgModule} from '@angular/core';
import {JigsawInputModule, JigsawTableModule, TableCellNumericEditorRenderer} from "jigsaw/public_api";
import {TableSetCellEditableDemoComponent, MyTableCell, MyTableCellEditor} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTableModule, JigsawInputModule, JigsawDemoDescriptionModule],
    declarations: [TableSetCellEditableDemoComponent, MyTableCell, MyTableCellEditor],
    exports: [TableSetCellEditableDemoComponent],
    entryComponents: [
        MyTableCell, MyTableCellEditor, TableCellNumericEditorRenderer
    ],
})
export class TableSetCellEditableDemoModule {
}
