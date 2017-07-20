import { NgModule } from '@angular/core';
import { JigsawTableModule } from "jigsaw/component/table/table";
import { TableLineEllipsisDemoComponent }  from './app.component';

@NgModule({
    imports: [ JigsawTableModule ],
    declarations: [ TableLineEllipsisDemoComponent ],
    bootstrap: [ TableLineEllipsisDemoComponent ]
})
export class TableLineEllipsisDemoModule {}
