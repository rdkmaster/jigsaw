import {NgModule} from "@angular/core";
import {JigsawChartIconModule, JigsawTableModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {ChartIconTableDemoComponent} from "./demo.component";

@NgModule({
    declarations: [ChartIconTableDemoComponent],
    exports: [ ChartIconTableDemoComponent ],
    imports: [JigsawChartIconModule, JigsawDemoDescriptionModule, JigsawTableModule]
})
export class ChartIconTableDemoModule {
}
