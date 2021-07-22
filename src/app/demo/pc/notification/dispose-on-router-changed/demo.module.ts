import {NgModule} from "@angular/core";
import {JigsawButtonModule, JigsawNotificationModule, PopupService} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {NotificationDisposeOnRouterDemoComponent} from "./demo.component";

@NgModule({
    declarations: [NotificationDisposeOnRouterDemoComponent],
    imports: [
        JigsawNotificationModule, JigsawDemoDescriptionModule, JigsawButtonModule
    ],
    providers: [PopupService],
    exports: [NotificationDisposeOnRouterDemoComponent]
})
export class NotificationDisposeOnRouterDemoModule {
}
