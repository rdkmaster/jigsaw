import {NgModule} from "@angular/core";
import {
    JigsawBadgeModule,
    JigsawButtonBarModule,
    JigsawButtonModule,
    JigsawCheckBoxModule,
    JigsawIconModule,
    JigsawInputModule,
    JigsawRadioLiteModule,
    JigsawSwitchModule,
    JigsawTileLiteModule,
} from "jigsaw/public_api";
import {BadgeBasicDemoComponent} from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    declarations: [BadgeBasicDemoComponent],
    imports: [
        JigsawIconModule, JigsawBadgeModule, JigsawButtonModule, JigsawSwitchModule, JigsawCheckBoxModule,
        JigsawInputModule, JigsawRadioLiteModule, JigsawButtonBarModule, JigsawTileLiteModule, DemoTemplateModule
    ],
    exports: [BadgeBasicDemoComponent]
})
export class BadgeBasicDemoModule {
}
