import {NgModule} from '@angular/core';
import {JigsawTableModule, JigsawButtonModule} from "jigsaw/public_api";

import {TableHideHeadDemoComponent} from './demo.component';

@NgModule({
    imports: [JigsawTableModule, JigsawButtonModule, JigsawDemoDescriptionModule],
    declarations: [TableHideHeadDemoComponent],
    exports: [TableHideHeadDemoComponent]
})
export class TableHideHeadDemoModule {
}
