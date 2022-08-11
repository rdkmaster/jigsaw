import {NgModule} from "@angular/core";
import {JigsawTextareaModule, JigsawTimeSectionModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {TimeSectionFillBackDemoComponent} from "./demo.component";

@NgModule({
    declarations: [TimeSectionFillBackDemoComponent],
    exports: [ TimeSectionFillBackDemoComponent ],
    imports: [
        JigsawDemoDescriptionModule, JigsawTimeSectionModule, JigsawTextareaModule
    ]
})
export class TimeSectionFillBackDemoModule {
}
