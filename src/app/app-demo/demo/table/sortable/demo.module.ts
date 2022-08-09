import {NgModule} from '@angular/core';
import {JigsawTableModule, JigsawPaginationModule, JigsawButtonModule} from "jigsaw/public_api";
import {TableSetHeaderSortDemoComponent} from './demo.component';
import {DemoTemplateModule} from "../../demo-template/demo-template";

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    imports: [JigsawTableModule, JigsawPaginationModule, JigsawButtonModule, DemoTemplateModule, JigsawHeaderModule],
    declarations: [TableSetHeaderSortDemoComponent],
    exports: [TableSetHeaderSortDemoComponent]
})
export class TableSetHeaderSortDemoModule {
}
