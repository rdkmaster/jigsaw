import {NgModule} from "@angular/core";
import {JigsawButtonModule, JigsawNotificationModule, PopupService} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {NotificationBasicDemoComponent} from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    declarations: [NotificationBasicDemoComponent],
    imports: [
        JigsawNotificationModule, JigsawDemoDescriptionModule, JigsawButtonModule, DemoTemplateModule
    ],
    providers: [PopupService],
    exports: [NotificationBasicDemoComponent]
})
export class NotificationBasicDemoModule {
}
