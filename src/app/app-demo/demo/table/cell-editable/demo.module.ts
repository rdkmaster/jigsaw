import {NgModule} from '@angular/core';
import {JigsawInputModule, JigsawTableModule} from "jigsaw/public_api";
import {TableSetCellEditableDemoComponent, MyTableCell, MyTableCellEditor} from './demo.component';
import {DemoTemplateModule} from "../../demo-template/demo-template";

@NgModule({
    imports: [ JigsawTableModule, JigsawInputModule, DemoTemplateModule ],
    declarations: [ TableSetCellEditableDemoComponent, MyTableCell, MyTableCellEditor ],
    exports: [ TableSetCellEditableDemoComponent ],
})
export class TableSetCellEditableDemoModule {
}
