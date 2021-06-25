import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawButtonModule, JigsawHeaderModule, JigsawStepsModule} from "jigsaw/public_api";
import {JigsawStepGotoDemoComponent} from "./demo.component";

@NgModule({
    imports: [
        JigsawStepsModule,
        CommonModule,
        JigsawDemoDescriptionModule,
        JigsawHeaderModule,
        JigsawButtonModule
    ],
    declarations: [JigsawStepGotoDemoComponent],
    exports: [JigsawStepGotoDemoComponent]
})
export class JigsawStepGotoDemoModule {
}
