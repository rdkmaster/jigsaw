import { NgModule } from '@angular/core';
import { JigsawTableModule } from "jigsaw/component/table/table";
import { JigsawSelectModule } from "jigsaw/component/select/select";
import { TableRendererDemoComponent }  from './app.component';
import { TableHeadIcon, TableHeadSelect } from "./table-renderer";

@NgModule({
    imports: [ JigsawTableModule, JigsawSelectModule ],
    declarations: [ TableRendererDemoComponent, TableHeadSelect, TableHeadIcon ],
    bootstrap: [ TableRendererDemoComponent ],
    entryComponents: [
        TableHeadSelect, TableHeadIcon
    ]
})
export class TableRendererDemoModule {}
