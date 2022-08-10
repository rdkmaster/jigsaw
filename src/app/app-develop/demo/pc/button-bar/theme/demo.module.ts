import { NgModule } from "@angular/core";
import {
    JigsawButtonBarModule,
    JigsawRadioLiteModule,
    JigsawSwitchModule,
    JigsawHeaderModule
} from "jigsaw/public_api";
import { ButtonBarThemeDemoComponent } from "./demo.component";
import { JigsawDemoDescriptionModule } from "app/app-develop/demo-description/demo-description";

@NgModule({
    imports: [
        JigsawButtonBarModule,
        JigsawRadioLiteModule,
        JigsawDemoDescriptionModule,
        JigsawSwitchModule,
        JigsawHeaderModule
    ],
    declarations: [ButtonBarThemeDemoComponent],
    exports: [ButtonBarThemeDemoComponent]
})
export class ButtonBarThemeDemoModule {}
