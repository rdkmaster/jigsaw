import { NgModule } from '@angular/core';
import { JigsawButtonModule, JigsawHeaderModule, JigsawInputModule, JigsawTableModule } from "jigsaw/public_api";
import { TableUpdateAdditionalColumnDefineDemoComponent } from './demo.component';
import { JigsawDemoDescriptionModule } from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTableModule, JigsawDemoDescriptionModule, JigsawInputModule, JigsawButtonModule, JigsawHeaderModule],
    declarations: [TableUpdateAdditionalColumnDefineDemoComponent],
    exports: [TableUpdateAdditionalColumnDefineDemoComponent]
})
export class TableUpdateAdditionalColumnDefineDemoModule {
}
