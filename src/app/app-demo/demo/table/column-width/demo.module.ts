import {NgModule} from '@angular/core';
import {JigsawButtonModule, JigsawTableModule, JigsawHeaderModule} from "jigsaw/public_api";
import {TableColumnWidthDemoComponent} from './demo.component';



@NgModule({
    imports: [JigsawTableModule, JigsawButtonModule,  JigsawHeaderModule],
    declarations: [TableColumnWidthDemoComponent],
    exports: [TableColumnWidthDemoComponent]
})
export class TableColumnWidthDemoModule {
}
