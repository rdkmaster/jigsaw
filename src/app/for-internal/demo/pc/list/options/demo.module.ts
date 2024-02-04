import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JigsawListModule, JigsawCheckBoxModule, JigsawComboSelectModule, JigsawHeaderModule, JigsawButtonModule, JigsawSwitchModule, JigsawNumericInputModule, JigsawIconModule } from "jigsaw/public_api";
import { JigsawDemoDescriptionModule } from "app/for-internal/description/demo-description";
import { ListOptionsDemoComponent } from "./demo.component";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";

@NgModule({
    imports: [
        JigsawListModule, CommonModule, JigsawCheckBoxModule, JigsawComboSelectModule,
        JigsawDemoDescriptionModule, JigsawHeaderModule, PerfectScrollbarModule, JigsawButtonModule,
        JigsawSwitchModule, JigsawNumericInputModule, JigsawHeaderModule, JigsawIconModule
    ],
    declarations: [ListOptionsDemoComponent],
    exports: [ListOptionsDemoComponent]
})
export class ListOptionsDemoModule {
}
