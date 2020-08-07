import {NgModule} from "@angular/core";
import {
    JigsawIconModule,
    JigsawBadgeModule,
    JigsawNumericInputModule,
    JigsawButtonModule,
    JigsawSwitchModule,
    JigsawCheckBoxModule,
    JigsawInputModule,
    JigsawRadioLiteModule,
    JigsawButtonBarModule,
    JigsawTileLiteModule,
    JigsawDatePickerModule,
} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {BadgeBasicDemoComponent} from "./demo.component";

@NgModule({
    declarations: [BadgeBasicDemoComponent],
    imports: [
        JigsawDemoDescriptionModule, JigsawIconModule, JigsawBadgeModule, JigsawNumericInputModule, JigsawButtonModule,
        JigsawSwitchModule, JigsawCheckBoxModule, JigsawInputModule, JigsawRadioLiteModule, JigsawButtonBarModule,
        JigsawTileLiteModule, JigsawDatePickerModule
    ],
    exports: [BadgeBasicDemoComponent]
})
export class BadgeBasicDemoModule {
}
