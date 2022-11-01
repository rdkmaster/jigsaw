import { NgModule } from "@angular/core";
import { DemoTemplateModule } from '../../template/demo-template/demo-template';
import { DocTemplateModule } from '../../template/doc-template/doc-template';
import { DocFooterTemplateModule } from '../../template/doc-footer-template/doc-footer-template';
import { DemoNavigationModule } from '../../template/demo-navigation/demo-navigation';
import { JigsawMarkdownModule } from '../../../libs/markdown/markdown';
import { PaginationAllComponent } from "./demo.component";
import { JigsawPaginationModule } from "jigsaw/public_api";
import { PaginationBasicDemoComponent } from "./basic/demo.component";
import { PaginationFoldDemoComponent } from "./fold/demo.component";
import { PaginationSimpleDemoComponent } from "./simple/demo.component";
import { PaginationBigDataDemoComponent } from "./big-data/demo.component";
import { PaginationNoDataDemoComponent } from "./no-data/demo.component";
import { PaginationWithSearchBoxDemoComponent } from "./with-search-box/demo.component";
import { PaginationHiddenDemoComponent } from "./hidden/demo.component";

@NgModule({
    declarations: [
        PaginationAllComponent,
        PaginationBasicDemoComponent,
        PaginationFoldDemoComponent,
        PaginationSimpleDemoComponent,
        PaginationBigDataDemoComponent,
        PaginationNoDataDemoComponent,
        PaginationWithSearchBoxDemoComponent,
        PaginationHiddenDemoComponent
    ],
    imports: [
        DemoTemplateModule,
        DocTemplateModule,
        DocFooterTemplateModule,
        DemoNavigationModule,
        JigsawMarkdownModule,
        JigsawPaginationModule
    ]
})
export class PaginationDemoModule {
}
