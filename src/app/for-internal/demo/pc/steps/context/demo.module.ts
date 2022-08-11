import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {JigsawStepContextDemoComponent} from "./demo.component";
import {JigsawButtonModule, JigsawHeaderModule, JigsawStepsModule} from "jigsaw/public_api";

@NgModule({
    imports: [
        JigsawStepsModule,
        CommonModule,
        JigsawDemoDescriptionModule,
        JigsawHeaderModule,
        JigsawButtonModule
    ],
    declarations: [JigsawStepContextDemoComponent],
    exports: [JigsawStepContextDemoComponent]
})
export class JigsawStepContextDemoModule {
}
