import {NgModule} from "@angular/core";
import {JigsawIconModule, JigsawBadgeModule, JigsawNumericInputModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {BadgeStatusDemoComponent} from "./demo.component";
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [BadgeStatusDemoComponent],
    imports: [
        JigsawDemoDescriptionModule, JigsawIconModule, JigsawBadgeModule, JigsawNumericInputModule, CommonModule
    ],
    exports: [BadgeStatusDemoComponent]
})
export class BadgeStatusDemoModule {
}
