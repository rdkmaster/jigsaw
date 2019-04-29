import {NgModule} from '@angular/core';
import {JigsawButtonModule} from "jigsaw/pc-components/button/button";
import {JigsawTableModule} from "jigsaw/pc-components/table/table";
import {TableColumnSetVisibleDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTableModule, JigsawButtonModule, JigsawDemoDescriptionModule],
    declarations: [TableColumnSetVisibleDemoComponent],
    exports: [TableColumnSetVisibleDemoComponent]
})
export class TableColumnSetVisibleDemoModule {
}
