import { NgModule } from "@angular/core";
import { DemoTemplateModule } from '../../template/demo-template/demo-template';
import { DocTemplateModule } from '../../template/doc-template/doc-template';
import { DocFooterTemplateModule } from '../../template/doc-footer-template/doc-footer-template';
import { DemoNavigationModule } from '../../template/demo-navigation/demo-navigation';
import { JigsawMarkdownModule } from '../../../libs/markdown/markdown';
import { JigsawTreeExtModule, JigsawInputModule, JigsawButtonModule } from "jigsaw/public_api";
import { ZtreeDemoComponent } from "./basic/demo.component";
import { ZtreeAllComponent } from "./demo.component";
import { ZtreeDemoEditableComponent } from "./editable/demo.component";
import { ZtreeFuzzySearchComponent } from "./fuzzy-search/demo.component";
import { ZTreeIconDemoComponent } from "./icon/demo.component";
import { ZTreeAsyncDemoComponent } from "./async/demo.component";
import { ZtreeXMLDataDemoComponent } from "./xml-data/demo.component";
import { ZTreeNodeOperationsDemoComponent } from "./node-operations/demo.component";


@NgModule({
    declarations: [
        ZtreeAllComponent,
        ZtreeDemoComponent,
        ZtreeDemoEditableComponent,
        ZtreeFuzzySearchComponent,
        ZTreeIconDemoComponent,
        ZTreeAsyncDemoComponent,
        ZtreeXMLDataDemoComponent,
        ZTreeNodeOperationsDemoComponent
    ],
    imports: [
        DemoTemplateModule,
        DocTemplateModule,
        DocFooterTemplateModule,
        DemoNavigationModule,
        JigsawMarkdownModule,
        JigsawTreeExtModule,
        JigsawInputModule,
        JigsawButtonModule
    ]
})
export class ZtreeDemoModule {
}
