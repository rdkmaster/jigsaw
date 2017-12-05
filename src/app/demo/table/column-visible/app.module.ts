import {NgModule} from '@angular/core';
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {JigsawTableModule} from "jigsaw/component/table/table";
import {TableColumnSetVisibleDemoComponent} from './app.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTableModule, JigsawButtonModule, JigsawDemoDescriptionModule],
    declarations: [TableColumnSetVisibleDemoComponent],
    exports: [TableColumnSetVisibleDemoComponent]
})
export class TableColumnSetVisibleDemoModule {
}
