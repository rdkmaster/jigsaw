import { NgModule } from '@angular/core';
import { JigsawHeaderModule, JigsawTableModule } from "jigsaw/public_api";
import { JigsawDemoDescriptionModule } from "app/for-internal/description/demo-description";
import { TableMaxWidthDemoComponent } from './demo.component';

@NgModule({
    imports: [JigsawTableModule, JigsawDemoDescriptionModule, JigsawHeaderModule],
    declarations: [TableMaxWidthDemoComponent],
    exports: [TableMaxWidthDemoComponent]
})
export class TableMaxWidthDemoModule {
}
