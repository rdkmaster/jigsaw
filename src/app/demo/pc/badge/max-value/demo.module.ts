import {NgModule} from "@angular/core";
import {JigsawIconModule, JigsawBadgeModule, JigsawNumericInputModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {BadgeMaxValueDemoComponent} from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    declarations: [BadgeMaxValueDemoComponent],
    imports: [
        JigsawDemoDescriptionModule, JigsawIconModule, JigsawBadgeModule, JigsawNumericInputModule, DemoTemplateModule
    ],
    exports: [BadgeMaxValueDemoComponent]
})
export class BadgeMaxValueDemoModule {
}
