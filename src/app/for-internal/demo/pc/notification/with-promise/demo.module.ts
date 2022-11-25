import {NgModule} from "@angular/core";
import {JigsawButtonModule, JigsawNotificationModule, PopupService} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {NotificationWithPromiseDemoComponent} from "./demo.component";

@NgModule({
    declarations: [NotificationWithPromiseDemoComponent],
    imports: [
        JigsawNotificationModule, JigsawDemoDescriptionModule, JigsawButtonModule
    ],
    providers: [PopupService],
    exports: [NotificationWithPromiseDemoComponent]
})
export class NotificationWithPromiseDemoModule {
}
