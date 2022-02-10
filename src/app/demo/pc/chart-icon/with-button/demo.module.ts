import {NgModule} from "@angular/core";
import {JigsawButtonModule, JigsawHeaderModule, JigsawCheckBoxModule, JigsawChartIconModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ChartIconButtonDemoComponent} from "./demo.component";


@NgModule({
    declarations: [ChartIconButtonDemoComponent],
    exports: [ ChartIconButtonDemoComponent ],
    imports: [
        JigsawChartIconModule, JigsawButtonModule, JigsawDemoDescriptionModule, JigsawHeaderModule,
        JigsawCheckBoxModule
    ]
})
export class ChartIconButtonDemoModule {
}
