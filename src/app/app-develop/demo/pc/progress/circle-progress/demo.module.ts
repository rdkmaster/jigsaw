import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JigsawDemoDescriptionModule } from "app/app-develop/demo-description/demo-description";
import { JigsawProgressModule, JigsawHeaderModule } from "jigsaw/public_api";
import { JigsawCircleProgressDemoComponent } from "./demo.component";


@NgModule({
    imports: [
        JigsawProgressModule,
        CommonModule,
        JigsawDemoDescriptionModule,
        JigsawHeaderModule
    ],
    declarations: [JigsawCircleProgressDemoComponent],
    exports: [JigsawCircleProgressDemoComponent]
})
export class JigsawCircleProgressDemoModule {}
