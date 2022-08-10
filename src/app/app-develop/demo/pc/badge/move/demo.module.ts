import {NgModule} from "@angular/core";
import {
    JigsawMovableModule,
    JigsawAlertModule,
    JigsawBadgeModule,
    JigsawSliderModule,
    JigsawButtonModule
} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";
import {BadgeMoveDemoComponent} from "./demo.component";

@NgModule({
    imports: [
        JigsawMovableModule, JigsawAlertModule, JigsawBadgeModule, JigsawSliderModule,
        JigsawDemoDescriptionModule, JigsawButtonModule
    ],
    declarations: [BadgeMoveDemoComponent],
    exports: [BadgeMoveDemoComponent]
})
export class BadgeMoveDemoModule {

}
