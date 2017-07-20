import { NgModule } from '@angular/core';
import { JigsawTableModule } from "jigsaw/component/table/table";
import { JigsawButtonModule } from "jigsaw/component/button/button";
import { TableDataChangeDemoComponent }  from './app.component';

@NgModule({
    imports: [ JigsawTableModule, JigsawButtonModule ],
    declarations: [ TableDataChangeDemoComponent ],
    bootstrap: [ TableDataChangeDemoComponent ]
})
export class TableDataChangeDemoModule {}
