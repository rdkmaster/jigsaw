import { NgModule } from '@angular/core';
import { JigsawTableModule } from "jigsaw/public_api";
import { JigsawDemoDescriptionModule } from "app/demo-description/demo-description";
import { TableAlignContentDemoComponent } from './demo.component';

@NgModule({
    imports: [JigsawTableModule, JigsawDemoDescriptionModule],
    declarations: [TableAlignContentDemoComponent],
    exports: [TableAlignContentDemoComponent]
})
export class TableAlignContentDemoModule {
}
