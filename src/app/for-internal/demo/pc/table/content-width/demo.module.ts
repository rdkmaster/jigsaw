import {NgModule} from '@angular/core';
import {JigsawHeaderModule, JigsawTableModule} from "jigsaw/public_api";
import {TableContentWidthDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";

@NgModule({
    imports: [JigsawTableModule, JigsawDemoDescriptionModule, JigsawHeaderModule],
    declarations: [TableContentWidthDemoComponent],
    exports: [TableContentWidthDemoComponent]
})
export class TableContentWidthDemoModule {
}
