import {NgModule} from "@angular/core";
import {JigsawTimeSectionModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TimeSectionBasicDemoComponent} from "./demo.component";

@NgModule({
    declarations: [TimeSectionBasicDemoComponent],
    exports: [ TimeSectionBasicDemoComponent ],
    imports: [JigsawDemoDescriptionModule, JigsawTimeSectionModule]
})
export class TimeSectionBasicDemoModule{

}
