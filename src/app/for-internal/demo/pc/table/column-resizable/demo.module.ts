import { NgModule } from '@angular/core';
import { JigsawButtonModule, JigsawNumericInputModule, JigsawSwitchModule, JigsawTableModule } from "jigsaw/public_api";
import { TableColumnResizableDemoComponent } from './demo.component';
import { JigsawDemoDescriptionModule } from "app/for-internal/description/demo-description";

@NgModule({
    imports: [JigsawTableModule, JigsawButtonModule, JigsawDemoDescriptionModule, JigsawSwitchModule],
    declarations: [TableColumnResizableDemoComponent],
    exports: [TableColumnResizableDemoComponent]
})
export class TableColumnResizableDemoModule {
}
