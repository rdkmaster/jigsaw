import {NgModule} from '@angular/core';
import {JigsawTableModule, JigsawButtonModule} from "jigsaw/public_api";

import {TableSelectRowDemoComponent} from './demo.component';

@NgModule({
    imports: [JigsawTableModule, JigsawButtonModule, JigsawDemoDescriptionModule],
    declarations: [TableSelectRowDemoComponent],
    exports: [TableSelectRowDemoComponent]
})
export class TableSelectRowDemoModule {
}
