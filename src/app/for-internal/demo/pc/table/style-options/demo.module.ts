import { NgModule } from '@angular/core';
import { JigsawInputModule, JigsawTableModule } from "jigsaw/public_api";
import { JigsawDemoDescriptionModule } from "app/for-internal/description/demo-description";
import { TableSetStyleDemoComponent } from './demo.component';

@NgModule({
    imports: [JigsawTableModule, JigsawDemoDescriptionModule, JigsawInputModule],
    declarations: [TableSetStyleDemoComponent],
    exports: [TableSetStyleDemoComponent]
})
export class TableSetStyleDemoModule {
}
