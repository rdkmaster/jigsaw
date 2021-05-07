import {NgModule} from "@angular/core";
import {JigsawButtonBarModule, JigsawCheckBoxModule, JigsawTimeSectionModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TimeSectionOptionsDemoComponent} from "./demo.component";

@NgModule({
    declarations: [TimeSectionOptionsDemoComponent],
    exports: [ TimeSectionOptionsDemoComponent ],
    imports: [
        JigsawDemoDescriptionModule, JigsawTimeSectionModule, JigsawButtonBarModule, JigsawCheckBoxModule,
        JigsawCheckBoxModule
    ]
})
export class TimeSectionOptionsDemoModule {
}
