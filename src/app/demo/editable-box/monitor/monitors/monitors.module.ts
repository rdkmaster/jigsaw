import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawTableModule} from "jigsaw/component/table/table";
import {JigsawGraphModule} from "jigsaw/component/graph/index";
import {JigsawSelectModule} from "jigsaw/component/select/select";
import {JigsawListModule} from "jigsaw/component/list-and-tile/list";
import {JigsawTagModule} from "jigsaw/component/tag/tag";
import {JigsawInputModule} from "jigsaw/component/input/input";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {JigsawDialogModule} from "jigsaw/component/dialog/dialog";
import {JigsawTooltipModule} from "jigsaw/component/tooltip/tooltip";
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
