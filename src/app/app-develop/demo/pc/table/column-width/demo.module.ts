import {NgModule} from '@angular/core';
import {JigsawButtonModule, JigsawTableModule, JigsawHeaderModule} from "jigsaw/public_api";
import {TableColumnWidthDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";


@NgModule({
    imports: [JigsawTableModule, JigsawButtonModule, JigsawDemoDescriptionModule, JigsawHeaderModule],
    declarations: [TableColumnWidthDemoComponent],
    exports: [TableColumnWidthDemoComponent]
})
export class TableColumnWidthDemoModule {
}
