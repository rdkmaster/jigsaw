import {NgModule} from "@angular/core";
import {
    JigsawButtonModule, JigsawNotificationModule, PopupService, JigsawInputModule,
    JigsawRadioModule, JigsawSliderModule
} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {NotificationFullDemoComponent} from "./demo.component";

@NgModule({
    declarations: [NotificationFullDemoComponent],
    imports: [
        JigsawButtonModule, JigsawNotificationModule, JigsawInputModule,
        JigsawRadioModule, JigsawSliderModule, JigsawDemoDescriptionModule
    ],
    providers: [PopupService],
    exports: [NotificationFullDemoComponent]
})
export class NotificationFullDemoModule {
}
