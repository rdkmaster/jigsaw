import {NgModule} from '@angular/core';
import {JigsawButtonModule, JigsawTableModule} from "jigsaw/public_api";
import {TableColumnSetVisibleDemoComponent} from './demo.component';
import {DemoTemplateModule} from "../../demo-template/demo-template";

@NgModule({
    imports: [JigsawTableModule, JigsawButtonModule, DemoTemplateModule],
    declarations: [TableColumnSetVisibleDemoComponent],
    exports: [TableColumnSetVisibleDemoComponent]
})
export class TableColumnSetVisibleDemoModule {
}
