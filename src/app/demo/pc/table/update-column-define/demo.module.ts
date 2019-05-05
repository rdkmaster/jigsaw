import {NgModule} from '@angular/core';
import {JigsawSliderModule} from "jigsaw/pc-components/slider/index";
import {JigsawTableModule} from "jigsaw/pc-components/table/table";
import {JigsawSwitchModule} from "jigsaw/pc-components/switch/index";
import {TableColumnSetWidthDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTableModule, JigsawSliderModule, JigsawSwitchModule, JigsawDemoDescriptionModule],
    declarations: [TableColumnSetWidthDemoComponent],
    exports: [TableColumnSetWidthDemoComponent]
})
export class TableColumnSetWidthDemoModule {
}
