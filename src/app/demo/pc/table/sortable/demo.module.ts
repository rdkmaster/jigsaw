import {NgModule} from '@angular/core';
import {JigsawTableModule} from "jigsaw/pc-components/table/table";
import {TableSetHeaderSortDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawPaginationModule} from "jigsaw/pc-components/pagination/pagination";
import {JigsawButtonModule} from "jigsaw/pc-components/button/button";

@NgModule({
    imports: [JigsawTableModule, JigsawPaginationModule, JigsawButtonModule, JigsawDemoDescriptionModule],
    declarations: [TableSetHeaderSortDemoComponent],
    exports: [TableSetHeaderSortDemoComponent]
})
export class TableSetHeaderSortDemoModule {
}
