import {NgModule} from "@angular/core";
import {JigsawHeaderModule, JigsawStatusModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {StatusBasicDemoComponent} from "./demo.component";

@NgModule({
    declarations: [StatusBasicDemoComponent],
    exports: [StatusBasicDemoComponent],
    imports: [JigsawDemoDescriptionModule, JigsawHeaderModule, JigsawStatusModule ]
})
export class StatusBasicDemoModule{

}
