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
} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {BadgeBasicDemoComponent} from "./demo.component";

@NgModule({
    declarations: [BadgeBasicDemoComponent],
    imports: [
        JigsawDemoDescriptionModule, JigsawIconModule, JigsawBadgeModule,
        JigsawButtonModule, JigsawSwitchModule, JigsawCheckBoxModule,
        JigsawInputModule, JigsawRadioLiteModule, JigsawButtonBarModule,
    ],
    exports: [BadgeBasicDemoComponent]
})
export class BadgeBasicDemoModule {
}
