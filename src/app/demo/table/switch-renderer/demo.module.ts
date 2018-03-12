import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawTableModule} from "jigsaw/component/table/table";
import {TableSwitchRendererDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTableModule, CommonModule, JigsawDemoDescriptionModule],
    declarations: [TableSwitchRendererDemoComponent],
    exports: [TableSwitchRendererDemoComponent]
})
export class TableSwitchRendererDemoModule {
}
