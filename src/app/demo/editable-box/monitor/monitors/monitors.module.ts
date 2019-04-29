import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawTableModule} from "jigsaw/pc-components/table/table";
import {JigsawGraphModule} from "jigsaw/pc-components/graph/index";
import {JigsawSelectModule} from "jigsaw/pc-components/select/select";
import {JigsawListModule} from "jigsaw/pc-components/list-and-tile/list";
import {JigsawTagModule} from "jigsaw/pc-components/tag/tag";
import {JigsawInputModule} from "jigsaw/pc-components/input/input";
import {JigsawButtonModule} from "jigsaw/pc-components/button/button";
import {JigsawDialogModule} from "jigsaw/pc-components/dialog/dialog";
import {JigsawTooltipModule} from "jigsaw/pc-components/tooltip/tooltip";
import {TableMonitorComponent, TrendingCellRenderer} from "./table.comp";
import {GraphMonitorComponent} from "./graph.comp";
import {NewChartPanel, NewMonitorComponent} from "./new-monitor.comp";
import {MonitorService} from "./monitor-service";
import {ToolbarModule} from "../comp/toolbar.module";

@NgModule({
    imports: [
        CommonModule, ToolbarModule, JigsawTableModule, JigsawGraphModule, JigsawSelectModule, JigsawListModule,
        JigsawTagModule, JigsawInputModule, JigsawButtonModule, JigsawDialogModule, JigsawTooltipModule
    ],
    declarations: [
        TableMonitorComponent, TrendingCellRenderer, GraphMonitorComponent, NewMonitorComponent,
        NewChartPanel
    ],
    exports: [TableMonitorComponent, GraphMonitorComponent, NewMonitorComponent],
    entryComponents: [TrendingCellRenderer, NewChartPanel],
    providers: [MonitorService]
})
export class MonitorsModule {
}
