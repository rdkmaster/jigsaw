import {NgModule} from "@angular/core";
import {JigsawColorSelectModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ColorSelectModeDemoComponent} from "./demo.component";

@NgModule({
    declarations: [ColorSelectModeDemoComponent],
    imports: [
        JigsawColorSelectModule, JigsawDemoDescriptionModule
    ],
    exports: [ColorSelectModeDemoComponent]
})
export class ColorSelectModeDemoModule {
}
