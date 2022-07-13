import {NgModule} from "@angular/core";
import {JigsawIconModule, JigsawBadgeModule, JigsawNumericInputModule} from "jigsaw/public_api";
import {BadgeStatusDemoComponent} from "./demo.component";
import {CommonModule} from "@angular/common";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    declarations: [BadgeStatusDemoComponent],
    imports: [
        JigsawIconModule, JigsawBadgeModule, JigsawNumericInputModule, CommonModule, DemoTemplateModule
    ],
    exports: [BadgeStatusDemoComponent]
})
export class BadgeStatusDemoModule {
}
