import {NgModule} from "@angular/core";
import {ChartIconDemoComponent} from "./demo.component";
import {DemoTemplateModule} from "../../demo-template/demo-template";
import {JigsawMarkdownModule} from "../../../markdown/markdown";
import {JigsawChartIconModule} from "../../../../jigsaw/pc-components/chart-icon/chart-icon";
import {ChartIconBasicDemoComponent} from "./basic/demo.component";
import {JigsawButtonModule} from "../../../../jigsaw/pc-components/button/button";
import {JigsawCheckBoxModule} from "../../../../jigsaw/pc-components/checkbox";
import {ChartIconButtonDemoComponent} from "./with-button/demo.component";
import {JigsawHeaderModule} from "../../../../jigsaw/pc-components/header/header";
import {ChartIconTableDemoComponent} from "./with-table/demo.component";
import {JigsawTableModule} from "../../../../jigsaw/pc-components/table/table";

@NgModule({
    declarations: [ChartIconDemoComponent, ChartIconBasicDemoComponent, ChartIconButtonDemoComponent, ChartIconTableDemoComponent],
    exports: [
        ChartIconButtonDemoComponent
    ],
    imports: [DemoTemplateModule, JigsawMarkdownModule, JigsawChartIconModule, JigsawButtonModule, JigsawCheckBoxModule, JigsawHeaderModule,
        JigsawTableModule]
})
export class ChartIconDemoModule {
}
