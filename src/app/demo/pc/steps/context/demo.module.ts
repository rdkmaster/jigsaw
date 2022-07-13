import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawStepContextDemoComponent} from "./demo.component";
import {JigsawButtonModule, JigsawHeaderModule, JigsawStepsModule} from "jigsaw/public_api";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    imports: [
        JigsawStepsModule,
        CommonModule,
        JigsawDemoDescriptionModule,
        JigsawHeaderModule,
        JigsawButtonModule,
        DemoTemplateModule
    ],
    declarations: [JigsawStepContextDemoComponent],
    exports: [JigsawStepContextDemoComponent]
})
export class JigsawStepContextDemoModule {
}
