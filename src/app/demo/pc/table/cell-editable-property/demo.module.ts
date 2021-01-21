import {NgModule} from '@angular/core';
import {JigsawInputModule, JigsawTableModule} from "jigsaw/public_api";
import {TableCellEditablePropertyDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [ JigsawTableModule, JigsawInputModule, JigsawDemoDescriptionModule ],
    declarations: [ TableCellEditablePropertyDemoComponent],
    exports: [ TableCellEditablePropertyDemoComponent ],
})
export class TableCellEditablePropertyDemoModule {
}
