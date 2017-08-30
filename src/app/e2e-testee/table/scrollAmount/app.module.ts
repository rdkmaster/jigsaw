import { NgModule } from '@angular/core';
import { JigsawTableModule } from "jigsaw/component/table/table";
import { TableScrollAmountDemoComponent }  from './app.component';

@NgModule({
    imports: [ JigsawTableModule ],
    declarations: [ TableScrollAmountDemoComponent ],
    bootstrap: [ TableScrollAmountDemoComponent ]
})
export class TableScrollAmountDemoModule {}
