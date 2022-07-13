import { NgModule } from "@angular/core";
import { JigsawButtonModule, PopupService, JigsawHeaderModule, JigsawToastModule } from "jigsaw/public_api";
import { JigsawDemoDescriptionModule } from "app/demo-description/demo-description";
import { ToastBasicDemoComponent } from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    declarations: [ToastBasicDemoComponent],
    imports: [
        JigsawToastModule, JigsawDemoDescriptionModule, JigsawButtonModule, JigsawHeaderModule, DemoTemplateModule
    ],
    providers: [PopupService],
    exports: [ToastBasicDemoComponent]
})
export class ToastBasicDemoModule {
}
