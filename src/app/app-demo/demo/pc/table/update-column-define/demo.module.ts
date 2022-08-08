import {NgModule} from '@angular/core';
import {JigsawSliderModule, JigsawTableModule, JigsawSwitchModule} from "jigsaw/public_api";
import {TableColumnSetWidthDemoComponent} from './demo.component';
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    imports: [JigsawTableModule, JigsawSliderModule, JigsawSwitchModule, DemoTemplateModule],
    declarations: [TableColumnSetWidthDemoComponent],
    exports: [TableColumnSetWidthDemoComponent]
})
export class TableColumnSetWidthDemoModule {
}
