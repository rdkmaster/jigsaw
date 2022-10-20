import { NgModule } from "@angular/core";
import { DemoTemplateModule } from '../../template/demo-template/demo-template';
import { DocTemplateModule } from '../../template/doc-template/doc-template';
import { JigsawMarkdownModule } from '../../../libs/markdown/markdown';
import { JigsawButtonModule, JigsawInputModule, JigsawSliderModule, JigsawSwitchModule, JigsawTableModule } from "jigsaw/public_api";
import { TableColumnDefinesAllComponent } from "./demo.component";
import { TableAlignContentDemoComponent } from "./align-content/demo.component";
import { TableColumnSetVisibleDemoComponent } from "./column-visible/demo.component";
import { TableUpdateAdditionalColumnDefineDemoComponent } from "./update-additional-column-defines/demo.component";
import { TableUpdateColumnDefinesDemoComponent } from "./update-column-defines/demo.component";
import { TableColumnSetWidthDemoComponent } from "./update-column-define/demo.component";
import { TableSetHeaderClassDemoComponent } from "./header-class/demo.component";
import { TableSetCellClassDemoComponent } from "./set-cell-class/demo.component";
import { TableColumnGroupDemoComponent } from "./column-group/demo.component";

@NgModule({
    declarations: [
        TableColumnDefinesAllComponent,
        TableAlignContentDemoComponent,
        TableColumnSetVisibleDemoComponent,
        TableUpdateAdditionalColumnDefineDemoComponent,
        TableColumnSetWidthDemoComponent,
        TableUpdateColumnDefinesDemoComponent,
        TableSetHeaderClassDemoComponent,
        TableSetCellClassDemoComponent,
        TableColumnGroupDemoComponent
    ],
    imports: [
        DemoTemplateModule,
        DocTemplateModule,
        JigsawMarkdownModule,
        JigsawTableModule,
        JigsawButtonModule,
        JigsawInputModule,
        JigsawSliderModule,
        JigsawSwitchModule

    ]
})
export class TableColumnDefinesDemoModule {
}
