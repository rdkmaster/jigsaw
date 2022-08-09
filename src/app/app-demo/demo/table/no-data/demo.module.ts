import {NgModule} from '@angular/core';
import {JigsawTableModule} from "jigsaw/public_api";

import {TableNoDataDemoComponent} from './demo.component';

@NgModule({
    imports: [JigsawTableModule, JigsawDemoDescriptionModule],
    declarations: [TableNoDataDemoComponent],
    exports: [TableNoDataDemoComponent]
})
export class TableNoDataDemoModule {
}
