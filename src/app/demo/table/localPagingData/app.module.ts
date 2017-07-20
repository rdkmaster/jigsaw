import { NgModule } from '@angular/core';
import { JigsawTableModule } from "jigsaw/component/table/table";
import { JigsawPaginationModule } from "jigsaw/component/pagination/pagination";
import { LocalPagingDataDemoComponent }  from './app.component';

@NgModule({
    imports: [ JigsawTableModule, JigsawPaginationModule ],
    declarations: [ LocalPagingDataDemoComponent ],
    bootstrap: [ LocalPagingDataDemoComponent ]
})
export class LocalPagingDataDemoModule {}
