import { NgModule } from '@angular/core';
import { JigsawTableModule } from "jigsaw/component/table/table";
import { TableBasicDemoComponent }  from './app.component';

@NgModule({
    imports: [ JigsawTableModule ],
    declarations: [ TableBasicDemoComponent ],
    bootstrap: [ TableBasicDemoComponent ]
})
export class TableBasicDemoModule {}
