import {NgModule} from "@angular/core";
import {JigsawTextareaModule, JigsawTimeSectionModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TimeSectionFillBackDemoComponent} from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    declarations: [TimeSectionFillBackDemoComponent],
    exports: [ TimeSectionFillBackDemoComponent ],
    imports: [
        JigsawDemoDescriptionModule, JigsawTimeSectionModule, JigsawTextareaModule, DemoTemplateModule
    ]
})
export class TimeSectionFillBackDemoModule {
}
