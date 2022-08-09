import {NgModule} from '@angular/core';
import {JigsawTableModule, JigsawButtonModule} from "jigsaw/public_api";

import {TableUpdateColumnDefinesDemoComponent} from './demo.component';

@NgModule({
    imports: [JigsawTableModule,  JigsawButtonModule],
    declarations: [TableUpdateColumnDefinesDemoComponent],
    exports: [TableUpdateColumnDefinesDemoComponent]
})
export class TableUpdateColumnDefinesDemoModule {
}
