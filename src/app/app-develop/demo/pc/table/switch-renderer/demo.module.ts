import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawTableModule, JigsawSwitchModule} from "jigsaw/public_api";
import {TableSwitchRendererDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";

@NgModule({
    imports: [JigsawTableModule, CommonModule, JigsawDemoDescriptionModule, JigsawSwitchModule],
    declarations: [TableSwitchRendererDemoComponent],
    exports: [TableSwitchRendererDemoComponent]
})
export class TableSwitchRendererDemoModule {
}
