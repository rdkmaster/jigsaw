import { NgModule, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JigsawButtonModule, JigsawHeaderModule, JigsawInputModule, JigsawSwitchModule } from "jigsaw/public_api";
import { JigsawDemoDescriptionModule } from "app/for-internal/description/demo-description";
import { PageableSelectArrayDemoComponent } from "./demo.component";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";

@NgModule({
    declarations: [PageableSelectArrayDemoComponent],
    exports: [PageableSelectArrayDemoComponent],
    imports: [JigsawButtonModule, CommonModule, JigsawDemoDescriptionModule, JigsawInputModule,
        PerfectScrollbarModule, JigsawHeaderModule, JigsawSwitchModule]
})
export class PageableSelectArrayDemoModule {
}
