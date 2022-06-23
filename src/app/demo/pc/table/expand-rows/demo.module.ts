import {NgModule} from '@angular/core';
import {
    JigsawTableModule, JigsawButtonModule, JigsawHeaderModule, JigsawButtonBarModule, JigsawSwitchModule
} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TableExpandTableDemoComponent} from './demo.component';

@NgModule({
    imports: [
        JigsawTableModule, JigsawDemoDescriptionModule, JigsawButtonModule, JigsawHeaderModule,
        JigsawButtonBarModule, JigsawSwitchModule
    ],
    declarations: [TableExpandTableDemoComponent],
    exports: [TableExpandTableDemoComponent]
})
export class TableExpandTableDemoModule {
}
