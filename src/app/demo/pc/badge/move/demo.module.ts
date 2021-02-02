import {NgModule} from "@angular/core";
import {JigsawMovableModule, JigsawAlertModule, JigsawBadgeModule, JigsawSliderModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {BadgeMoveDemoComponent} from "./demo.component";

@NgModule({
    imports: [
        JigsawMovableModule, JigsawAlertModule, JigsawBadgeModule, JigsawSliderModule,
        JigsawDemoDescriptionModule
    ],
    declarations: [BadgeMoveDemoComponent],
    exports: [BadgeMoveDemoComponent]
})
export class BadgeMoveDemoModule {

}
