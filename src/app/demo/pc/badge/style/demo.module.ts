import {NgModule} from "@angular/core";
import {JigsawBadgeModule, JigsawIconModule,} from "jigsaw/public_api";
import {BadgeStyleDemoComponent} from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    declarations: [BadgeStyleDemoComponent],
    imports: [
        JigsawIconModule, JigsawBadgeModule, DemoTemplateModule
    ],
    exports: [BadgeStyleDemoComponent]
})
export class BadgeStyleDemoModule {
}
