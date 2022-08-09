import {NgModule} from '@angular/core';
import {
    JigsawTableModule, JigsawButtonModule, JigsawHeaderModule, JigsawButtonBarModule, JigsawSwitchModule, JigsawPaginationModule
} from "jigsaw/public_api";

import {TableExpandPageableDemoComponent} from './demo.component';

@NgModule({
    imports: [
        JigsawTableModule,  JigsawButtonModule, JigsawHeaderModule,
        JigsawButtonBarModule, JigsawSwitchModule, JigsawPaginationModule
    ],
    declarations: [TableExpandPageableDemoComponent],
    exports: [TableExpandPageableDemoComponent]
})
export class TableExpandPageableDemoModule {
}
