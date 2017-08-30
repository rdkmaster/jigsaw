import { NgModule } from '@angular/core';
import { JigsawTableModule } from "jigsaw/component/table/table";
import { JigsawPaginationModule } from "jigsaw/component/pagination/pagination";
import { TablePageableDemoComponent }  from './app.component';

@NgModule({
    imports: [ JigsawTableModule, JigsawPaginationModule ],
    declarations: [ TablePageableDemoComponent ],
    bootstrap: [ TablePageableDemoComponent ]
})
export class TablePageableDemoModule {}
