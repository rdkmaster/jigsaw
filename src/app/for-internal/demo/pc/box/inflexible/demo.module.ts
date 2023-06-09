import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawBoxModule, JigsawHeaderModule, JigsawSliderModule, JigsawSwitchModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {BoxInflexibleDemoComponent} from "./demo.component";

@NgModule({
    declarations: [BoxInflexibleDemoComponent],
    exports: [BoxInflexibleDemoComponent],
    imports: [JigsawDemoDescriptionModule, JigsawBoxModule, CommonModule, JigsawHeaderModule, JigsawSwitchModule,
        JigsawSliderModule]
})
export class BoxInflexibleDemoModule {

}
