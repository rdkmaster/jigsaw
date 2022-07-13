import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawIconModule, JigsawBadgeModule, JigsawSliderModule, JigsawListModule} from "jigsaw/public_api";
import {BadgeOffsetDemoComponent} from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    declarations: [BadgeOffsetDemoComponent],
    imports: [
        CommonModule, JigsawIconModule, JigsawBadgeModule, JigsawSliderModule, JigsawListModule, DemoTemplateModule
    ],
    exports: [BadgeOffsetDemoComponent]
})
export class BadgeOffsetDemoModule {
}
