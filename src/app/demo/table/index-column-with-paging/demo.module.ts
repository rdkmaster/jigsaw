import {NgModule} from '@angular/core';
import {JigsawTableModule} from "jigsaw/component/table/table";
import {JigsawPaginationModule} from "jigsaw/component/pagination/pagination";
import {TableAddIDWithPagingComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTableModule, JigsawPaginationModule, JigsawDemoDescriptionModule],
    declarations: [TableAddIDWithPagingComponent],
    exports: [TableAddIDWithPagingComponent]
})
export class TableAddIDWithPagingModule {
}
