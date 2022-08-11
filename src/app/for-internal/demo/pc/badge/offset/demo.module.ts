import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawIconModule, JigsawBadgeModule, JigsawSliderModule, JigsawListModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {BadgeOffsetDemoComponent} from "./demo.component";

@NgModule({
    declarations: [BadgeOffsetDemoComponent],
    imports: [
        CommonModule, JigsawDemoDescriptionModule, JigsawIconModule, JigsawBadgeModule, JigsawSliderModule, JigsawListModule
    ],
    exports: [BadgeOffsetDemoComponent]
})
export class BadgeOffsetDemoModule {
}
