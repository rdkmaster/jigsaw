import { NgModule } from '@angular/core';
import { JigsawTableModule } from "jigsaw/component/table/table";
import { TableSetHeaderRenderDemoComponent }  from './app.component';

@NgModule({
    imports: [ JigsawTableModule ],
    declarations: [ TableSetHeaderRenderDemoComponent ],
    bootstrap: [ TableSetHeaderRenderDemoComponent ]
})
export class TableSetHeaderRenderDemoModule {}
