import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {
    JigsawTableModule, TableCellSelectRenderer, JigsawComboSelectModule, JigsawButtonModule,
    JigsawCheckBoxModule, JigsawListModule
} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TableSetCellRenderDemoComponent} from './demo.component';
import {OfficeHeaderRenderer} from "./renderers";

@NgModule({
    imports: [
        JigsawTableModule, CommonModule, JigsawDemoDescriptionModule, JigsawComboSelectModule, JigsawListModule,
        JigsawButtonModule, JigsawCheckBoxModule
    ],
    declarations: [TableSetCellRenderDemoComponent, OfficeHeaderRenderer],
    exports: [TableSetCellRenderDemoComponent],
    entryComponents: [
        TableCellSelectRenderer, OfficeHeaderRenderer
    ]
})
export class TableSetCellRenderDemoModule {
}
