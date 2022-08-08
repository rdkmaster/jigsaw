import {NgModule} from '@angular/core';
import {
    JigsawTableModule, JigsawButtonModule, JigsawHeaderModule, JigsawButtonBarModule, JigsawSwitchModule
} from "jigsaw/public_api";

import {TableExpandDemoComponent} from './demo.component';

@NgModule({
    imports: [
        JigsawTableModule,  JigsawButtonModule, JigsawHeaderModule,
        JigsawButtonBarModule, JigsawSwitchModule
    ],
    declarations: [TableExpandDemoComponent],
    exports: [TableExpandDemoComponent]
})
export class TableExpandDemoModule {
}
