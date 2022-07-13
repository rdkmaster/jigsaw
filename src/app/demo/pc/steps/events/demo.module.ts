import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawStepEventsDemoComponent} from "./demo.component";
import {JigsawButtonModule, JigsawHeaderModule, JigsawNumericInputModule, JigsawStepsModule} from "jigsaw/public_api";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    imports: [
        JigsawStepsModule,
        CommonModule,
        JigsawDemoDescriptionModule,
        JigsawHeaderModule,
        JigsawButtonModule,
        JigsawNumericInputModule,
        DemoTemplateModule
    ],
    declarations: [JigsawStepEventsDemoComponent],
    exports: [JigsawStepEventsDemoComponent]
})
export class JigsawStepEventsDemoModule {
}
