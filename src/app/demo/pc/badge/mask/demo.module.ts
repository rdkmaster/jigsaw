import {NgModule} from "@angular/core";
import {JigsawBadgeModule, JigsawButtonModule, JigsawIconModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {BadgeMaskDemoComponent} from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    declarations: [BadgeMaskDemoComponent],
    imports: [
        JigsawDemoDescriptionModule, JigsawIconModule, JigsawBadgeModule, JigsawButtonModule, DemoTemplateModule
    ],
    exports: [BadgeMaskDemoComponent]
})
export class BadgeMaskDemoModule {
}
