import {NgModule} from "@angular/core";
import {JigsawColorSelectModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ColorSelectPreSizeDemoComponent} from "./demo.component";

@NgModule({
    declarations: [ColorSelectPreSizeDemoComponent],
    imports: [
        JigsawColorSelectModule, JigsawDemoDescriptionModule
    ],
    exports: [ColorSelectPreSizeDemoComponent]
})
export class ColorSelectPreSizeDemoModule {
}
