import {NgModule} from "@angular/core";
import {DemoTemplateModule} from '../../demo-template/demo-template';
import {JigsawMarkdownModule} from '../../../libs/markdown/markdown';
import {TableBasicAllComponent} from "./demo.component";
import {
    JigsawPaginationModule,
    JigsawTableModule,
    JigsawDraggableModule,
    JigsawDroppableModule,
    JigsawTagModule,
    JigsawTableRendererModule,
    JigsawAutoCompleteInputModule
} from "jigsaw/public_api";
import {TableBasicBasicComponent} from "./basic/demo.component";
import {TableBasicNoDataDemoComponent} from "./no-data/demo.component";
import {TableBasicFixedHeadDemoComponent} from "./fixed-header/demo.component";
import {TableBasicHideHeadDemoComponent} from "./hide-header/demo.component";
import {TableBasicSetHeaderSortDemoComponent} from "./sortable/demo.component";
import {TableBasicAddIDColumnDemoComponent} from "./index-column/demo.component";
import {TableBasicAddIDWithPagingComponent} from "./index-column-with-paging/demo.component";
import {TableBasicPageableDemoComponent} from "./pageable/demo.component";
import {TableBasicPageableReadyDemoComponent} from "./pageable-ready/demo.component";
import {LocalPagingDataDemoComponent} from "./local-paging-data/demo.component";
import {ChartIconDemoModule} from "../chart-icon/demo.module";
import {TableBasicChartIconDemoComponent} from "./chart-icon/demo.component";
import {TableBasicProgressDemoComponent} from "./progress/demo.component";
import {TableBasicTreeTableDemoComponent} from "./tree-table/demo.component";
import {TableBasicContentWidthDemoComponent} from "./content-width/demo.component";

@NgModule({
    declarations: [
        TableBasicAllComponent,
        TableBasicBasicComponent,
        TableBasicNoDataDemoComponent,
        TableBasicFixedHeadDemoComponent,
        TableBasicHideHeadDemoComponent,
        TableBasicSetHeaderSortDemoComponent,
        TableBasicAddIDColumnDemoComponent,
        TableBasicAddIDWithPagingComponent,
        TableBasicPageableDemoComponent,
        TableBasicPageableReadyDemoComponent,
        LocalPagingDataDemoComponent,
        TableBasicChartIconDemoComponent,
        TableBasicProgressDemoComponent,
        TableBasicTreeTableDemoComponent,
        TableBasicContentWidthDemoComponent
    ],
    imports: [
        DemoTemplateModule,
        JigsawMarkdownModule,
        JigsawTableModule,
        JigsawPaginationModule,
        ChartIconDemoModule,
        JigsawDraggableModule,
        JigsawDroppableModule,
        JigsawTagModule,
        JigsawTableRendererModule,
        JigsawAutoCompleteInputModule

    ]
})
export class TableBasicDemoModule {
}
