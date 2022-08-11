import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {
    JigsawButtonModule,
    JigsawNotificationModule,
    PopupService,
    JigsawHeaderModule,
    JigsawInputModule,
    JigsawSliderModule,
    JigsawButtonBarModule
} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {ToastFullDemoComponent} from "./demo.component";

@NgModule({
    declarations: [ToastFullDemoComponent],
    imports: [
        JigsawNotificationModule, JigsawDemoDescriptionModule, JigsawButtonModule, JigsawHeaderModule,
        JigsawInputModule, JigsawSliderModule, JigsawButtonBarModule, CommonModule
    ],
    providers: [PopupService],
    exports: [ToastFullDemoComponent]
})
export class ToastFullDemoModule {
}
