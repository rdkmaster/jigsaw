import { NgModule } from '@angular/core';
import { JigsawTableModule } from "jigsaw/component/table/table";
import { TableHideHeadDemoComponent }  from './app.component';
import {JigsawButtonModule} from "jigsaw/component/button/button";

@NgModule({
    imports: [ JigsawTableModule, JigsawButtonModule ],
    declarations: [ TableHideHeadDemoComponent ],
    bootstrap: [ TableHideHeadDemoComponent ]
})
export class TableHideHeadDemoModule {}
