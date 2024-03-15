import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JigsawDemoDescriptionModule } from "app/for-internal/description/demo-description";
import { JigsawButtonModule, JigsawHeaderModule, JigsawNumericInputModule, JigsawSystemPromptModule } from "jigsaw/public_api";
import { JigsawSystemPromptBasicDemoComponent } from "./demo.component";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";

@NgModule({
    imports: [JigsawHeaderModule, CommonModule, JigsawDemoDescriptionModule, JigsawSystemPromptModule, JigsawButtonModule, PerfectScrollbarModule,
        JigsawNumericInputModule],
    declarations: [JigsawSystemPromptBasicDemoComponent],
    exports: [JigsawSystemPromptBasicDemoComponent]
})
export class JigsawSystemPromptBasicDemoModule { }
