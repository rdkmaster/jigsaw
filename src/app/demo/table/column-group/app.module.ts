import { NgModule } from '@angular/core';
import { JigsawTableModule } from "jigsaw/component/table/table";
import { TableColumnGroupDemoComponent }  from './app.component';

@NgModule({
    imports: [ JigsawTableModule ],
    declarations: [ TableColumnGroupDemoComponent ],
    bootstrap: [ TableColumnGroupDemoComponent ]
})
export class TableColumnGroupDemoModule {}
