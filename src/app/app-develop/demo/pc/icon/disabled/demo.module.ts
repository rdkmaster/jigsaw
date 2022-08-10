import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JigsawIconModule, JigsawSwitchModule, JigsawHeaderModule } from "jigsaw/public_api";
import { JigsawDemoDescriptionModule } from "app/app-develop/demo-description/demo-description";
import { IconDisabledDemoComponent } from "./demo.component";

@NgModule({
    imports: [
        JigsawIconModule, CommonModule, JigsawDemoDescriptionModule, JigsawSwitchModule, JigsawHeaderModule
    ],
    declarations: [IconDisabledDemoComponent],
    exports: [IconDisabledDemoComponent]
})
export class IconDisabledDemoModule {
}
