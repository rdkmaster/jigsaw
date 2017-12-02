import {NgModule} from '@angular/core';
import {JigsawSliderModule} from "jigsaw/component/slider/index";
import {JigsawTableModule} from "jigsaw/component/table/table";
import {JigsawSwitchModule} from "jigsaw/component/switch/index";
import {TableColumnSetWidthDemoComponent} from './app.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTableModule, JigsawSliderModule, JigsawSwitchModule, JigsawDemoDescriptionModule],
    declarations: [TableColumnSetWidthDemoComponent],
    exports: [TableColumnSetWidthDemoComponent]
})
export class TableColumnSetWidthDemoModule {
}
