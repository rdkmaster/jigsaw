import { NgModule } from '@angular/core';
import { JigsawButtonBarModule, JigsawButtonModule, JigsawSwitchModule, JigsawTableModule } from "jigsaw/public_api";
import { TableColumnResizableDemoComponent } from './demo.component';
import { JigsawDemoDescriptionModule } from "app/for-internal/description/demo-description";
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        JigsawTableModule,
        JigsawButtonModule,
        JigsawDemoDescriptionModule,
        JigsawSwitchModule,
        CommonModule,
        JigsawButtonBarModule,
    ],
    declarations: [TableColumnResizableDemoComponent],
    exports: [TableColumnResizableDemoComponent],
})
export class TableColumnResizableDemoModule {}
