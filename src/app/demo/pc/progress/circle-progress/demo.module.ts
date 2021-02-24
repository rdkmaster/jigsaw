import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JigsawDemoDescriptionModule } from "app/demo-description/demo-description";
import { JigsawCircleProgressModule, JigsawHeaderModule } from "jigsaw/public_api";
import { JigsawCircleProgressDemoComponent } from "./demo.component";


@NgModule({
    imports: [
        JigsawCircleProgressModule,
        CommonModule,
        JigsawDemoDescriptionModule,
        JigsawHeaderModule
    ],
    declarations: [JigsawCircleProgressDemoComponent],
    exports: [JigsawCircleProgressDemoComponent]
})
export class JigsawCircleProgressDemoModule {}
