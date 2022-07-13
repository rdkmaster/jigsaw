import { NgModule } from "@angular/core";
import { JigsawButtonModule, JigsawNotificationModule, PopupService, JigsawHeaderModule, JigsawInputModule, JigsawSliderModule } from "jigsaw/public_api";
import { JigsawDemoDescriptionModule } from "app/demo-description/demo-description";
import { ToastFullDemoComponent } from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    declarations: [ToastFullDemoComponent],
    imports: [
        JigsawNotificationModule, JigsawDemoDescriptionModule, JigsawButtonModule, JigsawHeaderModule, JigsawInputModule, JigsawSliderModule, DemoTemplateModule
    ],
    providers: [PopupService],
    exports: [ToastFullDemoComponent]
})
export class ToastFullDemoModule {
}
