import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";
import {JigsawStepEventsDemoComponent} from "./demo.component";
import {JigsawButtonModule, JigsawHeaderModule, JigsawNumericInputModule, JigsawStepsModule} from "jigsaw/public_api";

@NgModule({
    imports: [
        JigsawStepsModule,
        CommonModule,
        JigsawDemoDescriptionModule,
        JigsawHeaderModule,
        JigsawButtonModule,
        JigsawNumericInputModule
    ],
    declarations: [JigsawStepEventsDemoComponent],
    exports: [JigsawStepEventsDemoComponent]
})
export class JigsawStepEventsDemoModule {
}
