import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JigsawDemoDescriptionModule } from "app/for-internal/description/demo-description";
import { JigsawHeaderModule } from "jigsaw/public_api";
import { JigsawInsightBasicDemoComponent } from "./demo.component";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";

@NgModule({
    imports: [JigsawHeaderModule, CommonModule, JigsawDemoDescriptionModule, PerfectScrollbarModule],
    declarations: [JigsawInsightBasicDemoComponent],
    exports: [JigsawInsightBasicDemoComponent]
})
export class JigsawInsightBasicDemoModule {}
