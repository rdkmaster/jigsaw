import { NgModule } from '@angular/core';
import { JigsawTableModule } from "jigsaw/component/table/table";
import {TableCellOption, TableLineEllipsisDemoComponent} from './app.component';

@NgModule({
    imports: [ JigsawTableModule ],
    declarations: [ TableLineEllipsisDemoComponent, TableCellOption ],
    bootstrap: [ TableLineEllipsisDemoComponent ],
    entryComponents: [ TableCellOption ]
})
export class TableLineEllipsisDemoModule {}
