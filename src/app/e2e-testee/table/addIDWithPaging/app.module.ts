import { NgModule } from '@angular/core';
import { JigsawTableModule } from "jigsaw/component/table/table";
import { JigsawPaginationModule } from "jigsaw/component/pagination/pagination";
import { TableAddIDWithPagingComponent }  from './app.component';

@NgModule({
    imports: [ JigsawTableModule, JigsawPaginationModule ],
    declarations: [ TableAddIDWithPagingComponent ],
    bootstrap: [ TableAddIDWithPagingComponent ]
})
export class TableAddIDWithPagingModule {}
