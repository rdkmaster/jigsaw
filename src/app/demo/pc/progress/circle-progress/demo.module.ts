import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JigsawDemoDescriptionModule } from "app/demo-description/demo-description";
import { JigsawProgressModule, JigsawHeaderModule } from "jigsaw/public_api";
import { CircleProgressDemoComponent } from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    imports: [
        JigsawProgressModule,
        CommonModule,
        JigsawDemoDescriptionModule,
        JigsawHeaderModule,
        DemoTemplateModule
    ],
    declarations: [CircleProgressDemoComponent],
    exports: [CircleProgressDemoComponent]
})
export class CircleProgressDemoModule {}
