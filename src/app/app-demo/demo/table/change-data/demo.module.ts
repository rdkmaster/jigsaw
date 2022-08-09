import {NgModule} from '@angular/core';
import {JigsawTableModule, JigsawButtonModule} from "jigsaw/public_api";

import {TableChangeDataDemoComponent} from './demo.component';

@NgModule({
    imports: [JigsawTableModule,  JigsawButtonModule],
    declarations: [TableChangeDataDemoComponent],
    exports: [TableChangeDataDemoComponent]
})
export class TableChangeDataDemoModule {
}
