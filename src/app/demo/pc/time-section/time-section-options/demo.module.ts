import {NgModule} from "@angular/core";
import {JigsawButtonBarModule, JigsawCheckBoxModule, JigsawTimeSectionModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TimeSectionOptionsDemoComponent} from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    declarations: [TimeSectionOptionsDemoComponent],
    exports: [ TimeSectionOptionsDemoComponent ],
    imports: [
        JigsawDemoDescriptionModule, JigsawTimeSectionModule, JigsawButtonBarModule, JigsawCheckBoxModule,
        JigsawCheckBoxModule, DemoTemplateModule
    ]
})
export class TimeSectionOptionsDemoModule {
}
