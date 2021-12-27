import { NgModule } from "@angular/core";
import { JigsawButtonModule, JigsawNotificationModule, PopupService, JigsawHeaderModule } from "jigsaw/public_api";
import { JigsawDemoDescriptionModule } from "app/demo-description/demo-description";
import { ToastBasicDemoComponent } from "./demo.component";

@NgModule({
    declarations: [ToastBasicDemoComponent],
    imports: [
        JigsawNotificationModule, JigsawDemoDescriptionModule, JigsawButtonModule, JigsawHeaderModule
    ],
    providers: [PopupService],
    exports: [ToastBasicDemoComponent]
})
export class ToastBasicDemoModule {
}
