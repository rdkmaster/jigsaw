import {NgModule} from "@angular/core";
import {JigsawNotificationModule, PopupService} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {NotificationDisposeOnRouterDemoComponent} from "./demo.component";

@NgModule({
    declarations: [NotificationDisposeOnRouterDemoComponent],
    imports: [
        JigsawNotificationModule, JigsawDemoDescriptionModule
    ],
    providers: [PopupService],
    exports: [NotificationDisposeOnRouterDemoComponent]
})
export class NotificationDisposeOnRouterDemoModule {
}
