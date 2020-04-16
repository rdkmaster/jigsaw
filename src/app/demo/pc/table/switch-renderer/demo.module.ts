import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawTableModule} from "jigsaw/pc-components/table/table";
import {JigsawSwitchModule} from "jigsaw/pc-components/switch/index";
import {TableSwitchRendererDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTableModule, CommonModule, JigsawDemoDescriptionModule, JigsawSwitchModule],
    declarations: [TableSwitchRendererDemoComponent],
    exports: [TableSwitchRendererDemoComponent]
})
export class TableSwitchRendererDemoModule {
}
