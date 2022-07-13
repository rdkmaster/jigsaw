import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawButtonModule, JigsawHeaderModule, JigsawStepsModule} from "jigsaw/public_api";
import {JigsawStepGotoDemoComponent} from "./demo.component";
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
    declarations: [JigsawStepGotoDemoComponent],
    exports: [JigsawStepGotoDemoComponent]
})
export class JigsawStepGotoDemoModule {
}
