import { NgModule } from '@angular/core';
import { JigsawTableModule } from "jigsaw/component/table/table";
import { TablePerformsDemoComponent }  from './app.component';
import {TableHeadIcon, TableHeadSelect} from "./table-renderer";

@NgModule({
    imports: [ JigsawTableModule ],
    declarations: [ TablePerformsDemoComponent, TableHeadIcon, TableHeadSelect ],
    bootstrap: [ TablePerformsDemoComponent ],
    entryComponents: [ TableHeadIcon ]
})
export class TablePerformsDemoModule {}
