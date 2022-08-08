import {NgModule} from '@angular/core';
import {JigsawTableModule, JigsawPaginationModule} from "jigsaw/public_api";
import {TableAddIDWithPagingComponent} from './demo.component';
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    imports: [JigsawTableModule, JigsawPaginationModule, DemoTemplateModule],
    declarations: [TableAddIDWithPagingComponent],
    exports: [TableAddIDWithPagingComponent]
})
export class TableAddIDWithPagingModule {
}
