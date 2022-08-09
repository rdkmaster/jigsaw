import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {
    JigsawTableModule, JigsawComboSelectModule, JigsawButtonModule, JigsawCheckBoxModule,
    JigsawListModule
} from "jigsaw/public_api";
import {DemoTemplateModule} from "../../demo-template/demo-template";
import {TableSetCellRenderDemoComponent} from './demo.component';
import {OfficeHeaderRenderer} from "./renderers";

@NgModule({
    imports: [
        JigsawTableModule, CommonModule, DemoTemplateModule
        , JigsawComboSelectModule, JigsawListModule,
        JigsawButtonModule, JigsawCheckBoxModule
    ],
    declarations: [TableSetCellRenderDemoComponent, OfficeHeaderRenderer],
    exports: [TableSetCellRenderDemoComponent]
})
export class TableSetCellRenderDemoModule {
}
