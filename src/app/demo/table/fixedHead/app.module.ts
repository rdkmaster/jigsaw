import { NgModule } from '@angular/core';
import { JigsawTableModule } from "jigsaw/component/table/table";
import { TableFixedHeadDemoComponent }  from './app.component';

@NgModule({
    imports: [ JigsawTableModule ],
    declarations: [ TableFixedHeadDemoComponent ],
    bootstrap: [ TableFixedHeadDemoComponent ]
})
export class TableFixedHeadDemoModule {}
