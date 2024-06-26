import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JigsawDemoDescriptionModule } from "app/for-internal/description/demo-description";
import { JigsawAutoDisplayModule, JigsawButtonModule, JigsawHeaderModule, JigsawTagModule } from "jigsaw/public_api";
import { JigsawAutoDisplayBasicDemoComponent } from "./demo.component";

@NgModule({
    imports: [JigsawHeaderModule, CommonModule, JigsawDemoDescriptionModule, JigsawAutoDisplayModule, JigsawButtonModule,
        JigsawTagModule],
    declarations: [JigsawAutoDisplayBasicDemoComponent],
    exports: [JigsawAutoDisplayBasicDemoComponent]
})
export class JigsawAutoDisplayBasicDemoModule { }
