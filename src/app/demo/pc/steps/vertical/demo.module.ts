import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawStepsModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {StepsVerticalFullComponent} from './demo.component';

@NgModule({
    imports: [
        CommonModule, JigsawDemoDescriptionModule, JigsawStepsModule
    ],
    declarations: [StepsVerticalFullComponent],
    exports: [StepsVerticalFullComponent]
})
export class StepsVerticalModule {
}
