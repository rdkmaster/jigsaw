import {NgModule} from "@angular/core";
import {JigsawColorSelectModule, JigsawInputModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";
import {ColorSelectBasicDemoComponent} from "./demo.component";

@NgModule({
    declarations: [ColorSelectBasicDemoComponent],
    imports: [
        JigsawColorSelectModule, JigsawDemoDescriptionModule, JigsawInputModule
    ],
    exports: [ColorSelectBasicDemoComponent]
})
export class ColorSelectBasicDemoModule {
}
