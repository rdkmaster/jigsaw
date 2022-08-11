import {NgModule} from '@angular/core';
import {JigsawInputModule, JigsawTableModule} from "jigsaw/public_api";
import {TableSetCellEditableDemoComponent, MyTableCell, MyTableCellEditor} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";

@NgModule({
    imports: [ JigsawTableModule, JigsawInputModule, JigsawDemoDescriptionModule ],
    declarations: [ TableSetCellEditableDemoComponent, MyTableCell, MyTableCellEditor ],
    exports: [ TableSetCellEditableDemoComponent ],
})
export class TableSetCellEditableDemoModule {
}
