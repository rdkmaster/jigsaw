import {NgModule} from '@angular/core';
import {JigsawTableModule} from "jigsaw/component/table/table";
import {JigsawPaginationModule} from "jigsaw/component/pagination/pagination";
import {TableAddIDWithPagingComponent} from './app.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTableModule, JigsawPaginationModule, JigsawDemoDescriptionModule],
    declarations: [TableAddIDWithPagingComponent],
    bootstrap: [TableAddIDWithPagingComponent]
})
export class TableAddIDWithPagingModule {
}
