import {NgModule} from '@angular/core';
import {JigsawTableModule, JigsawPaginationModule} from "jigsaw/public_api";
import {TableAddIDWithPagingComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";

@NgModule({
    imports: [JigsawTableModule, JigsawPaginationModule, JigsawDemoDescriptionModule],
    declarations: [TableAddIDWithPagingComponent],
    exports: [TableAddIDWithPagingComponent]
})
export class TableAddIDWithPagingModule {
}
