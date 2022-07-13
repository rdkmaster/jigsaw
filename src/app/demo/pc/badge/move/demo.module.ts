import {NgModule} from "@angular/core";
import {
    JigsawMovableModule,
    JigsawAlertModule,
    JigsawBadgeModule,
    JigsawSliderModule,
    JigsawButtonModule
} from "jigsaw/public_api";
import {BadgeMoveDemoComponent} from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    imports: [
        JigsawMovableModule, JigsawAlertModule, JigsawBadgeModule, JigsawSliderModule,
        JigsawButtonModule, DemoTemplateModule
    ],
    declarations: [BadgeMoveDemoComponent],
    exports: [BadgeMoveDemoComponent]
})
export class BadgeMoveDemoModule {

}
