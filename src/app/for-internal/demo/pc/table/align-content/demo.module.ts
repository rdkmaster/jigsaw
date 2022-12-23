import { NgModule } from '@angular/core';
import { JigsawHeaderModule, JigsawTableModule } from "jigsaw/public_api";
import { JigsawDemoDescriptionModule } from "app/for-internal/description/demo-description";
import { TableAlignContentDemoComponent } from './demo.component';

@NgModule({
    imports: [JigsawTableModule, JigsawDemoDescriptionModule, JigsawHeaderModule],
    declarations: [TableAlignContentDemoComponent],
    exports: [TableAlignContentDemoComponent]
})
export class TableAlignContentDemoModule {
}
