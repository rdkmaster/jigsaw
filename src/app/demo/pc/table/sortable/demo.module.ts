import {NgModule} from '@angular/core';
import {JigsawTableModule, JigsawPaginationModule, JigsawButtonModule} from "jigsaw/public_api";
import {TableSetHeaderSortDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTableModule, JigsawPaginationModule, JigsawButtonModule, JigsawDemoDescriptionModule],
    declarations: [TableSetHeaderSortDemoComponent],
    exports: [TableSetHeaderSortDemoComponent]
})
export class TableSetHeaderSortDemoModule {
}
