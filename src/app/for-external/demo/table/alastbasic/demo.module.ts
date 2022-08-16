import {NgModule} from '@angular/core';
import {JigsawTableModule} from "jigsaw/public_api";

import {TableBasicDemoComponent} from './demo.component';

@NgModule({
    imports: [JigsawTableModule, JigsawDemoDescriptionModule],
    declarations: [TableBasicDemoComponent],
    exports: [TableBasicDemoComponent]
})
export class TableBasicDemoModule {
}
