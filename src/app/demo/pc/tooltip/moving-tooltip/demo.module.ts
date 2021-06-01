import {NgModule} from "@angular/core";
import {JigsawMovableModule, JigsawAlertModule, JigsawBadgeModule, JigsawSliderModule, JigsawTooltipModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {MovingTooltipDemoComponent} from "./demo.component";

@NgModule({
    imports: [
        JigsawMovableModule, JigsawTooltipModule, JigsawDemoDescriptionModule
    ],
    declarations: [MovingTooltipDemoComponent],
    exports: [MovingTooltipDemoComponent]
})
export class MovingTooltipDemoModule {

}
