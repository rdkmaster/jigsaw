import { NgModule } from '@angular/core';
import { JigsawButtonModule, JigsawSwitchModule, JigsawTableModule } from "jigsaw/public_api";
import { TableColumnResizableDemoComponent } from './demo.component';
import { JigsawDemoDescriptionModule } from "app/for-internal/description/demo-description";
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [JigsawTableModule, JigsawButtonModule, JigsawDemoDescriptionModule, JigsawSwitchModule, CommonModule],
    declarations: [TableColumnResizableDemoComponent],
    exports: [TableColumnResizableDemoComponent]
})
export class TableColumnResizableDemoModule {
}
