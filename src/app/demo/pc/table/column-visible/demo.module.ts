import {NgModule} from '@angular/core';
import {JigsawButtonModule, JigsawTableModule} from "jigsaw/public_api";
import {TableColumnSetVisibleDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTableModule, JigsawButtonModule, JigsawDemoDescriptionModule],
    declarations: [TableColumnSetVisibleDemoComponent],
    exports: [TableColumnSetVisibleDemoComponent]
})
export class TableColumnSetVisibleDemoModule {
}
