import {NgModule} from "@angular/core";
import {DemoTemplateModule} from '../../demo-template/demo-template';
import {JigsawMarkdownModule} from '../../../libs/markdown/markdown';
import {
    JigsawPaginationModule,
    JigsawTableModule,
    JigsawDraggableModule,
    JigsawDroppableModule,
    JigsawTagModule,
    JigsawTableRendererModule,
    JigsawAutoCompleteInputModule,
    JigsawComboSelectModule,
    JigsawCheckBoxModule,
    JigsawListModule,
    JigsawSelectModule,
    JigsawButtonModule,
    JigsawSwitchModule,
    JigsawInputModule,
    JigsawAlertModule,
    JigsawTileSelectModule,
    TranslateHelper,
    JigsawSliderModule
} from "jigsaw/public_api";
import {ChartIconDemoModule} from "../chart-icon/demo.module";
import {TableRendererAllComponent} from "./demo.component";
import {TableSetCellRenderDemoComponent} from "./cell-render/demo.component";
import {CellRendererOfficeHeaderRenderer} from "./cell-render/renderers";
import {TableCellSelectRenderDemoComponent} from "./cell-select-renderer/demo.component";
import {TableHtmlRendererDemoComponent} from "./html-renderer/demo.component";
import {TableRendererDemoComponent} from "./renderer/demo.component";
import {OfficeCellEditorRenderer, OfficeCellRenderer, PositionHeaderRenderer, OfficeHeaderRenderer} from "./renderer/renderers";
import {TableSetHeaderRenderDemoComponent} from "./header-render/demo.component";
import {TableRendererOfTemplateRefDemoComponent} from "./template-ref-renderer/demo.component";
import {TableSwitchRendererDemoComponent} from "./switch-renderer/demo.component";
import {TableAddCheckboxColumnDemoComponent} from "./checkbox-column/demo.component";
import {TableCheckboxColumnObjectCellDemoComponent} from "./checkbox-column-object-cell/demo.component";
import {TableAddCheckboxColumnPageableDemoComponent} from "./checkbox-column-pageable/demo.component";
import {MyTableCell, MyTableCellEditor, TableSetCellEditableDemoComponent} from "./cell-editable/demo.component";
import {TableCellEditablePropertyDemoComponent} from "./cell-editable-property/demo.component";
import {MixinTable, TableMixinTableDemoComponent} from "./mixin-table/demo.component";
import {CalendarDateRenderer, TableCalendarDemoComponent} from "./calendar/demo.component";
import {SudokuGameComponent} from "./sudoku/demo.component";
import {NumberRenderer} from "./sudoku/number-renderer";
import {NumberSelectPad} from "./sudoku/number-select-pad";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {SwimLaneDiagramDemoComponent} from "./swim-lane-diagram/demo.component";
import {TableSwimLaneCell} from "./swim-lane-diagram/table-renderer";


@NgModule({
    declarations: [
        TableRendererAllComponent,
        TableSetCellRenderDemoComponent,
        CellRendererOfficeHeaderRenderer,
        TableCellSelectRenderDemoComponent,
        TableHtmlRendererDemoComponent,
        TableRendererDemoComponent,
        PositionHeaderRenderer,
        OfficeCellRenderer,
        OfficeCellEditorRenderer,
        OfficeHeaderRenderer,
        TableSetHeaderRenderDemoComponent,
        TableRendererOfTemplateRefDemoComponent,
        TableSwitchRendererDemoComponent,
        TableAddCheckboxColumnDemoComponent,
        TableCheckboxColumnObjectCellDemoComponent,
        TableAddCheckboxColumnPageableDemoComponent,
        TableSetCellEditableDemoComponent,
        MyTableCell,
        MyTableCellEditor,
        TableCellEditablePropertyDemoComponent,
        TableMixinTableDemoComponent,
        MixinTable,
        TableCalendarDemoComponent,
        CalendarDateRenderer,
        SudokuGameComponent,
        NumberRenderer,
        NumberSelectPad,
        SwimLaneDiagramDemoComponent,
        TableSwimLaneCell

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
        JigsawAutoCompleteInputModule,
        JigsawComboSelectModule,
        JigsawCheckBoxModule,
        JigsawListModule,
        JigsawSelectModule,
        JigsawButtonModule,
        JigsawSwitchModule,
        JigsawInputModule,
        JigsawAlertModule,
        JigsawTileSelectModule,
        JigsawSliderModule,
        TranslateModule.forChild()
    ]
})
export class TableRendererDemoModule {
    constructor(translateService: TranslateService) {
        // 增加自定义词条，最后一个参数必须是true
        translateService.setTranslation('zh', {
            title: {
                neName: "网元名称",
                neType: "网元类型",
                nodeIp: "节点IP"
            }
        }, true);
        translateService.setTranslation('en', {
            title: {
                neName: "Ne Name",
                neType: "Ne Type",
                nodeIp: "Node Ip"
            }
        }, true);
        translateService.setDefaultLang(translateService.getBrowserLang());
        TranslateHelper.languageChangEvent.subscribe(langInfo => {
            translateService.use(langInfo.curLang);
        });
    }
}
