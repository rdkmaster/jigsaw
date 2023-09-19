import { NgModule } from '@angular/core';
import { JigsawSwitchModule, JigsawTableModule } from "jigsaw/public_api";
import { JigsawDemoDescriptionModule } from "app/for-internal/description/demo-description";
import { TableOverflowDemoComponent } from './demo.component';

@NgModule({
    imports: [JigsawTableModule, JigsawDemoDescriptionModule, JigsawSwitchModule],
    declarations: [TableOverflowDemoComponent],
    exports: [TableOverflowDemoComponent]
})
export class TableOverflowDemoModule {
}
