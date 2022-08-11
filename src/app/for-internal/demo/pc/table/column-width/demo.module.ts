import {NgModule} from '@angular/core';
import {JigsawButtonModule, JigsawTableModule, JigsawHeaderModule} from "jigsaw/public_api";
import {TableColumnWidthDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";


@NgModule({
    imports: [JigsawTableModule, JigsawButtonModule, JigsawDemoDescriptionModule, JigsawHeaderModule],
    declarations: [TableColumnWidthDemoComponent],
    exports: [TableColumnWidthDemoComponent]
})
export class TableColumnWidthDemoModule {
}
