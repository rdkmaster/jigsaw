import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
    JigsawTableModule,
    JigsawDraggableModule,
    JigsawDroppableModule,
    JigsawTagModule,
    JigsawTableRendererModule
} from "jigsaw/public_api";
import { JigsawDemoDescriptionModule } from "app/demo-description/demo-description";
import { TableDraggableDemoComponent } from "./demo.component";

@NgModule({
    imports: [
        JigsawDraggableModule,
        JigsawDroppableModule,
        JigsawTableModule,
        JigsawTagModule,
        CommonModule,
        JigsawDemoDescriptionModule,
        JigsawTableRendererModule
    ],
    declarations: [TableDraggableDemoComponent],
    exports: [TableDraggableDemoComponent]
})
export class TableDraggableDemoModule {}
