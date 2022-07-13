import {NgModule} from "@angular/core";
import {JigsawNotificationModule, PopupService} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {NotificationDisposeOnRouterDemoComponent} from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    declarations: [NotificationDisposeOnRouterDemoComponent],
    imports: [
        JigsawNotificationModule, JigsawDemoDescriptionModule, DemoTemplateModule
    ],
    providers: [PopupService],
    exports: [NotificationDisposeOnRouterDemoComponent]
})
export class NotificationDisposeOnRouterDemoModule {
}
