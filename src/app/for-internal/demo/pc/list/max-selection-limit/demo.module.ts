import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JigsawListModule, JigsawCheckBoxModule, JigsawComboSelectModule, JigsawHeaderModule, JigsawButtonModule, JigsawSwitchModule, JigsawNumericInputModule } from "jigsaw/public_api";
import { JigsawDemoDescriptionModule } from "app/for-internal/description/demo-description";
import { ListMaxSelectionLimitDemoComponent } from "./demo.component";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";

@NgModule({
    imports: [
        JigsawListModule, CommonModule, JigsawCheckBoxModule, JigsawComboSelectModule,
        JigsawDemoDescriptionModule, JigsawHeaderModule, PerfectScrollbarModule, JigsawButtonModule,
        JigsawSwitchModule, JigsawNumericInputModule, JigsawHeaderModule
    ],
    declarations: [ListMaxSelectionLimitDemoComponent],
    exports: [ListMaxSelectionLimitDemoComponent]
})
export class ListMaxSelectionLimitDemoModule {
}
