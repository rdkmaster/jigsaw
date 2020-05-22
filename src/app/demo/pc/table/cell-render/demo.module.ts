import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawTableModule} from "jigsaw/pc-components/table/table";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawComboSelectModule} from "jigsaw/pc-components/combo-select";
import {JigsawButtonModule} from "jigsaw/pc-components/button/button";
import {JigsawCheckBoxModule} from "jigsaw/pc-components/checkbox";
import {JigsawListModule} from "jigsaw/pc-components/list-and-tile/list";
import {TableSetCellRenderDemoComponent} from './demo.component';
import {OfficeHeaderRenderer} from "./renderers";

@NgModule({
    imports: [
        JigsawTableModule, CommonModule, JigsawDemoDescriptionModule, JigsawComboSelectModule, JigsawListModule,
        JigsawButtonModule, JigsawCheckBoxModule
    ],
    declarations: [TableSetCellRenderDemoComponent, OfficeHeaderRenderer],
    exports: [TableSetCellRenderDemoComponent]
})
export class TableSetCellRenderDemoModule {
}
