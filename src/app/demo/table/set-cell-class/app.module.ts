import { NgModule } from '@angular/core';
import { JigsawTableModule } from "jigsaw/component/table/table";
import { TableSetCellClassDemoComponent }  from './app.component';

@NgModule({
    imports: [ JigsawTableModule ],
    declarations: [ TableSetCellClassDemoComponent ],
    bootstrap: [ TableSetCellClassDemoComponent ]
})
export class TableSetCellClassDemoModule {}
