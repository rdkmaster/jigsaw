import {NgModule} from '@angular/core';
import {JigsawHeaderModule, JigsawSelectModule, JigsawTableModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {TableNoDataDemoComponent} from './demo.component';

@NgModule({
    imports: [JigsawTableModule, JigsawDemoDescriptionModule, JigsawHeaderModule, JigsawSelectModule],
    declarations: [TableNoDataDemoComponent],
    exports: [TableNoDataDemoComponent]
})
export class TableNoDataDemoModule {
}
