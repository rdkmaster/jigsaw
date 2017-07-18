import { NgModule } from '@angular/core';
import { JigsawTableModule } from "jigsaw/component/table/table";
import { TableSetHeaderSortDemoComponent }  from './app.component';

@NgModule({
    imports: [ JigsawTableModule ],
    declarations: [ TableSetHeaderSortDemoComponent ],
    bootstrap: [ TableSetHeaderSortDemoComponent ]
})
export class TableSetHeaderSortDemoModule {}
