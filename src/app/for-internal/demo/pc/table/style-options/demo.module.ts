import { NgModule } from '@angular/core';
import { JigsawButtonModule, JigsawInputModule, JigsawNumericInputModule, JigsawTableModule } from "jigsaw/public_api";
import { JigsawDemoDescriptionModule } from "app/for-internal/description/demo-description";
import { TableSetStyleDemoComponent } from './demo.component';

@NgModule({
    imports: [JigsawTableModule, JigsawDemoDescriptionModule, JigsawInputModule, JigsawButtonModule, JigsawNumericInputModule],
    declarations: [TableSetStyleDemoComponent],
    exports: [TableSetStyleDemoComponent]
})
export class TableSetStyleDemoModule {
}
