import { NgModule } from '@angular/core';
import { JigsawTableModule } from "jigsaw/component/table/table";
import { TablePerformsDemoComponent }  from './app.component';
import { TableHeadIcon } from "./table-renderer";

@NgModule({
    imports: [ JigsawTableModule ],
    declarations: [ TablePerformsDemoComponent, TableHeadIcon ],
    bootstrap: [ TablePerformsDemoComponent ],
    entryComponents: [ TableHeadIcon ]
})
export class TablePerformsDemoModule {}
