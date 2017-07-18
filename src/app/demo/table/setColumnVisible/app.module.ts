import { NgModule } from '@angular/core';
import { JigsawButtonModule } from "jigsaw/component/button/button";
import { JigsawTableModule } from "jigsaw/component/table/table";
import { TableColumnSetVisibleDemoComponent }  from './app.component';

@NgModule({
    imports: [ JigsawTableModule, JigsawButtonModule ],
    declarations: [ TableColumnSetVisibleDemoComponent ],
    bootstrap: [ TableColumnSetVisibleDemoComponent ]
})
export class TableColumnSetVisibleDemoModule {}
