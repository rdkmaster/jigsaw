import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import { JigsawTableModule } from "jigsaw/component/table/table";
import { TableSetCellRenderDemoComponent }  from './app.component';

@NgModule({
    imports: [ JigsawTableModule, CommonModule ],
    declarations: [ TableSetCellRenderDemoComponent ],
    bootstrap: [ TableSetCellRenderDemoComponent ]
})
export class TableSetCellRenderDemoModule {}
