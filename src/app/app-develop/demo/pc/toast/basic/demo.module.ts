import { NgModule } from "@angular/core";
import { JigsawButtonModule, PopupService, JigsawHeaderModule, JigsawToastModule } from "jigsaw/public_api";
import { JigsawDemoDescriptionModule } from "app/app-develop/demo-description/demo-description";
import { ToastBasicDemoComponent } from "./demo.component";

@NgModule({
    declarations: [ToastBasicDemoComponent],
    imports: [
        JigsawToastModule, JigsawDemoDescriptionModule, JigsawButtonModule, JigsawHeaderModule
    ],
    providers: [PopupService],
    exports: [ToastBasicDemoComponent]
})
export class ToastBasicDemoModule {
}
