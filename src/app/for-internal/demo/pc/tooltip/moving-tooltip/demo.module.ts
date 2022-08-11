import {NgModule} from "@angular/core";
import {
    JigsawMovableModule,
    JigsawAlertModule,
    JigsawBadgeModule,
    JigsawSliderModule,
    JigsawTooltipModule,
    JigsawButtonModule
} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {MovingTooltipDemoComponent} from "./demo.component";

@NgModule({
    imports: [
        JigsawMovableModule, JigsawTooltipModule, JigsawDemoDescriptionModule, JigsawButtonModule
    ],
    declarations: [MovingTooltipDemoComponent],
    exports: [MovingTooltipDemoComponent]
})
export class MovingTooltipDemoModule {

}
