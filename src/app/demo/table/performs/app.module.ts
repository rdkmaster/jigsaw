import { NgModule } from '@angular/core';
import { JigsawTableModule } from "jigsaw/component/table/table";
import { TablePerformsDemoComponent }  from './app.component';

@NgModule({
    imports: [ JigsawTableModule ],
    declarations: [ TablePerformsDemoComponent ],
    bootstrap: [ TablePerformsDemoComponent ]
})
export class TablePerformsDemoModule {}
