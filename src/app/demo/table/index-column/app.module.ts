import { NgModule } from '@angular/core';
import { JigsawTableModule } from "jigsaw/component/table/table";
import { TableAddIDColumnDemoComponent }  from './app.component';

@NgModule({
    imports: [ JigsawTableModule ],
    declarations: [ TableAddIDColumnDemoComponent ],
    bootstrap: [ TableAddIDColumnDemoComponent ]
})
export class TableAddIDColumnDemoModule {}
