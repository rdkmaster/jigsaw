import {NgModule} from "@angular/core";
import {JigsawButtonBarModule, JigsawCheckBoxModule, JigsawTimeSectionModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TimeSectionBasicDemoComponent} from "./demo.component";

@NgModule({
    declarations: [TimeSectionBasicDemoComponent],
    exports: [ TimeSectionBasicDemoComponent ],
    imports: [
        JigsawDemoDescriptionModule, JigsawTimeSectionModule, JigsawButtonBarModule, JigsawCheckBoxModule,
        JigsawCheckBoxModule
    ]
})
export class TimeSectionBasicDemoModule{

}
