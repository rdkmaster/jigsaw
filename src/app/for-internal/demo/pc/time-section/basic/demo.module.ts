import {NgModule} from "@angular/core";
import {JigsawButtonBarModule, JigsawCheckBoxModule, JigsawTimeSectionModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {TimeSectionBasicDemoComponent} from "./demo.component";

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    declarations: [TimeSectionBasicDemoComponent],
    exports: [ TimeSectionBasicDemoComponent ],
    imports: [
        JigsawDemoDescriptionModule, JigsawTimeSectionModule, JigsawButtonBarModule, JigsawCheckBoxModule,
        JigsawCheckBoxModule
    , JigsawHeaderModule]
})
export class TimeSectionBasicDemoModule{

}
