import {NgModule} from "@angular/core";
import {JigsawHeaderModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {StatusBasicDemoComponent} from "./demo.component";
import { JigsawStatusModule } from 'jigsaw/pc-components/status/status';

@NgModule({
    declarations: [StatusBasicDemoComponent],
    exports: [StatusBasicDemoComponent],
    imports: [JigsawDemoDescriptionModule, JigsawHeaderModule, JigsawStatusModule ]
})
export class StatusBasicDemoModule{

}
