import {NgModule} from "@angular/core";
import {
    JigsawButtonModule, JigsawNotificationModule, PopupService, JigsawInputModule,
    JigsawRadioModule, JigsawSliderModule
} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {NotificationBasicDemoComponent} from "./demo.component";

@NgModule({
    declarations: [NotificationBasicDemoComponent],
    imports: [
        JigsawButtonModule, JigsawNotificationModule, JigsawInputModule,
        JigsawRadioModule, JigsawSliderModule, JigsawDemoDescriptionModule
    ],
    providers: [PopupService],
    exports: [NotificationBasicDemoComponent]
})
export class NotificationBasicDemoModule {
}
