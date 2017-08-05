import { NgModule } from '@angular/core';
import { JigsawTableModule } from "jigsaw/component/table/table";
import { TableSelectRowDemoComponent }  from './app.component';
import {JigsawButtonModule} from "jigsaw/component/button/button";

@NgModule({
    imports: [ JigsawTableModule, JigsawButtonModule ],
    declarations: [ TableSelectRowDemoComponent ],
    bootstrap: [ TableSelectRowDemoComponent ]
})
export class TableSelectRowDemoModule {}
