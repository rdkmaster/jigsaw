import {NgModule} from "@angular/core";
import {JigsawTimeSelectionModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TimeSelectionBasicDemoComponent} from "./demo.component";

@NgModule({
    declarations: [TimeSelectionBasicDemoComponent],
    exports: [ TimeSelectionBasicDemoComponent ],
    imports: [JigsawDemoDescriptionModule, JigsawTimeSelectionModule]
})
export class TimeSelectionBasicDemoModule{

}
