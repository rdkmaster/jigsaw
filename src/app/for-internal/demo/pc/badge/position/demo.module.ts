import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawIconModule, JigsawBadgeModule, JigsawNumericInputModule, JigsawListModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {BadgePositionDemoComponent} from "./demo.component";

@NgModule({
    declarations: [BadgePositionDemoComponent],
    imports: [
        CommonModule, JigsawDemoDescriptionModule, JigsawIconModule, JigsawBadgeModule, JigsawNumericInputModule, JigsawListModule
    ],
    exports: [BadgePositionDemoComponent]
})
export class BadgePositionDemoModule {
}
