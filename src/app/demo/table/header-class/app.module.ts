import { NgModule } from '@angular/core';
import { JigsawTableModule } from "jigsaw/component/table/table";
import { TableSetHeaderClassDemoComponent }  from './app.component';

@NgModule({
    imports: [ JigsawTableModule ],
    declarations: [ TableSetHeaderClassDemoComponent ],
    bootstrap: [ TableSetHeaderClassDemoComponent ]
})
export class TableSetHeaderClassDemoModule {}
