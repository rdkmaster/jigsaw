import {NgModule} from "@angular/core";
import {JigsawButtonModule, JigsawNotificationModule, PopupService} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {NotificationBasicDemoComponent} from "./demo.component";

@NgModule({
    declarations: [NotificationBasicDemoComponent],
    imports: [
        JigsawNotificationModule, JigsawDemoDescriptionModule, JigsawButtonModule
    ],
    providers: [PopupService],
    exports: [NotificationBasicDemoComponent]
})
export class NotificationBasicDemoModule {
}
