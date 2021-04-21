import { NgModule } from "@angular/core";
import { JigsawSwitchModule, JigsawHeaderModule } from "jigsaw/public_api";
import { JigsawDemoDescriptionModule } from "app/demo-description/demo-description";
import { SwitchSizeDemoComponent } from "./demo.component";

@NgModule({
    imports: [
        JigsawSwitchModule,
        JigsawDemoDescriptionModule,
        JigsawHeaderModule
    ],
    declarations: [SwitchSizeDemoComponent],
    exports: [SwitchSizeDemoComponent]
})
export class SwitchSizeDemoModule {}
