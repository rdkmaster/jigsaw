import { NgModule } from '@angular/core';
import { JigsawTableModule } from "jigsaw/component/table/table";
import { TableAddCheckboxColumnDemoComponent }  from './app.component';

@NgModule({
    imports: [ JigsawTableModule ],
    declarations: [ TableAddCheckboxColumnDemoComponent ],
    bootstrap: [ TableAddCheckboxColumnDemoComponent ]
})
export class TableAddCheckboxColumnDemoModule {}
