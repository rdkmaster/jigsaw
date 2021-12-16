import {NgModule} from "@angular/core";
import {JigsawButtonModule, JigsawChartIconModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ChartIconBasicDemoComponent} from "./demo.component";

@NgModule({
    declarations: [ChartIconBasicDemoComponent],
    exports: [ ChartIconBasicDemoComponent ],
    imports: [JigsawChartIconModule, JigsawButtonModule, JigsawDemoDescriptionModule]
})
export class ChartIconBasicDemoModule{

}
