import {NgModule} from '@angular/core';
import {JigsawSliderModule, JigsawTableModule, JigsawSwitchModule} from "jigsaw/public_api";
import {TableColumnSetWidthDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTableModule, JigsawSliderModule, JigsawSwitchModule, JigsawDemoDescriptionModule],
    declarations: [TableColumnSetWidthDemoComponent],
    exports: [TableColumnSetWidthDemoComponent]
})
export class TableColumnSetWidthDemoModule {
}
