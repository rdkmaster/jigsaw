import { NgModule } from "@angular/core";
import { DemoTemplateModule } from '../../template/demo-template/demo-template';
import { DocTemplateModule } from '../../template/doc-template/doc-template';
import { DocFooterTemplateModule } from '../../template/doc-footer-template/doc-footer-template';
import { DemoNavigationModule } from '../../template/demo-navigation/demo-navigation';
import { JigsawMarkdownModule } from '../../../libs/markdown/markdown';
import { TableBigDataAllComponent } from "./demo.component";
import {
    JigsawTableModule, JigsawSliderModule, JigsawSelectModule, JigsawComboSelectModule,
    JigsawListModule, JigsawButtonModule, JigsawCheckBoxModule,
    JigsawViewportModule
} from "jigsaw/public_api";
import { BigTableDataDemoComponent } from "./big-table/demo.component";
import { OfficeCellRenderer, OfficeHeaderRenderer, PositionHeaderRenderer } from "./big-table/renderers";
import { TableDataFromAjaxDemoComponent } from "./data-from-ajax/demo.component";

@NgModule({
    declarations: [
        TableBigDataAllComponent,
        BigTableDataDemoComponent,
        PositionHeaderRenderer,
        OfficeHeaderRenderer,
        OfficeCellRenderer,
        TableDataFromAjaxDemoComponent
    ],
    imports: [
        DemoTemplateModule,
        DocTemplateModule,
        DocFooterTemplateModule,
        DemoNavigationModule,
        JigsawMarkdownModule,
        JigsawTableModule,
        JigsawSliderModule,
        JigsawViewportModule,
        JigsawSelectModule,
        JigsawComboSelectModule,
        JigsawListModule,
        JigsawButtonModule,
        JigsawCheckBoxModule,


    ]
})
export class TableBigTableDemoModule {
}
