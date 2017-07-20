import { NgModule } from '@angular/core';
import { JigsawTableModule } from "jigsaw/component/table/table";
import { JigsawPaginationModule } from "jigsaw/component/pagination/pagination";
import { TableAddIDWithDebouncePagingComponent }  from './app.component';

@NgModule({
    imports: [ JigsawTableModule, JigsawPaginationModule ],
    declarations: [ TableAddIDWithDebouncePagingComponent ],
    bootstrap: [ TableAddIDWithDebouncePagingComponent ]
})
export class TableAddIDWithDebouncePagingModule {}
