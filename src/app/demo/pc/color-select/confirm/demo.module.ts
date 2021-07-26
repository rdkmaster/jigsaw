import {NgModule} from "@angular/core";
import {JigsawColorSelectModule, JigsawSwitchModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ColorSelectConfirmDemoComponent} from "./demo.component";

@NgModule({
    declarations: [ColorSelectConfirmDemoComponent],
    imports: [
        JigsawColorSelectModule, JigsawDemoDescriptionModule, JigsawSwitchModule
    ],
    exports: [ColorSelectConfirmDemoComponent]
})
export class ColorSelectConfirmDemoModule {
}
