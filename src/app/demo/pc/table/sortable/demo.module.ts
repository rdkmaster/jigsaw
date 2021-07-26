import {NgModule} from '@angular/core';
import {JigsawTableModule, JigsawPaginationModule, JigsawButtonModule} from "jigsaw/public_api";
import {TableSetHeaderSortDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    imports: [JigsawTableModule, JigsawPaginationModule, JigsawButtonModule, JigsawDemoDescriptionModule, JigsawHeaderModule],
    declarations: [TableSetHeaderSortDemoComponent],
    exports: [TableSetHeaderSortDemoComponent]
})
export class TableSetHeaderSortDemoModule {
}
