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
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";
import {BadgeBasicDemoComponent} from "./demo.component";

@NgModule({
    declarations: [BadgeBasicDemoComponent],
    imports: [
        JigsawDemoDescriptionModule, JigsawIconModule, JigsawBadgeModule, JigsawButtonModule, JigsawSwitchModule, JigsawCheckBoxModule,
        JigsawInputModule, JigsawRadioLiteModule, JigsawButtonBarModule, JigsawTileLiteModule,
    ],
    exports: [BadgeBasicDemoComponent]
})
export class BadgeBasicDemoModule {
}
