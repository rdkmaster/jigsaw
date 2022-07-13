import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawIconModule, JigsawBadgeModule, JigsawNumericInputModule, JigsawListModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {BadgePositionDemoComponent} from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    declarations: [BadgePositionDemoComponent],
    imports: [
        CommonModule, JigsawDemoDescriptionModule, JigsawIconModule, JigsawBadgeModule, JigsawNumericInputModule, JigsawListModule, DemoTemplateModule
    ],
    exports: [BadgePositionDemoComponent]
})
export class BadgePositionDemoModule {
}
