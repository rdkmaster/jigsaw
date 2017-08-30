import { NgModule } from '@angular/core';
import { JigsawButtonModule } from "jigsaw/component/button/button";
import { JigsawTableModule } from "jigsaw/component/table/table";
import { TableColumnSetWidthDemoComponent }  from './app.component';

@NgModule({
    imports: [ JigsawTableModule, JigsawButtonModule ],
    declarations: [ TableColumnSetWidthDemoComponent ],
    bootstrap: [ TableColumnSetWidthDemoComponent ]
})
export class TableColumnSetWidthDemoModule {}
