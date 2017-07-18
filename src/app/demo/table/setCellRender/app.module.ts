import { NgModule } from '@angular/core';
import { JigsawTableModule } from "jigsaw/component/table/table";
import { TableSetCellRenderDemoComponent }  from './app.component';

@NgModule({
    imports: [ JigsawTableModule ],
    declarations: [ TableSetCellRenderDemoComponent ],
    bootstrap: [ TableSetCellRenderDemoComponent ]
})
export class TableSetCellRenderDemoModule {}
