import {NgModule} from '@angular/core';
import {JigsawTableModule, JigsawPaginationModule, JigsawButtonModule} from "jigsaw/public_api";
import {TableSetHeaderFilterDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    imports: [JigsawTableModule, JigsawPaginationModule, JigsawButtonModule, JigsawDemoDescriptionModule, JigsawHeaderModule],
    declarations: [TableSetHeaderFilterDemoComponent],
    exports: [TableSetHeaderFilterDemoComponent]
})
export class TableSetHeaderFilterDemoModule {
}
