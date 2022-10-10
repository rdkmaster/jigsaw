import {NgModule} from "@angular/core";
import {
    JigsawMovableModule,
    JigsawAlertModule,
    JigsawSliderModule,
    JigsawButtonModule,
    JigsawRibbonModule
} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {RibbonMoveDemoComponent} from "./demo.component";

@NgModule({
    imports: [
        JigsawMovableModule, JigsawAlertModule, JigsawRibbonModule, JigsawSliderModule,
        JigsawDemoDescriptionModule, JigsawButtonModule
    ],
    declarations: [RibbonMoveDemoComponent],
    exports: [RibbonMoveDemoComponent]
})
export class RibbonMoveDemoModule {
}
