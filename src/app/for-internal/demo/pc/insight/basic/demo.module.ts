import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JigsawDemoDescriptionModule } from "app/for-internal/description/demo-description";
import { JigsawButtonModule, JigsawHeaderModule, JigsawInputModule } from "jigsaw/public_api";
import { JigsawInsightBasicDemoComponent } from "./demo.component";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";

@NgModule({
    imports: [JigsawHeaderModule, CommonModule, JigsawDemoDescriptionModule, PerfectScrollbarModule, JigsawInputModule, JigsawButtonModule],
    declarations: [JigsawInsightBasicDemoComponent],
    exports: [JigsawInsightBasicDemoComponent]
})
export class JigsawInsightBasicDemoModule { }
