import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {
    JigsawTableModule,
    JigsawDraggableModule,
    JigsawDroppableModule,
    JigsawTagModule,
    JigsawTableRendererModule,
    JigsawAutoCompleteInputModule
} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TableProgressDemoComponent} from "./demo.component";

@NgModule({
    imports: [
        JigsawDraggableModule,
        JigsawDroppableModule,
        JigsawTableModule,
        JigsawTagModule,
        CommonModule,
        JigsawDemoDescriptionModule,
        JigsawTableRendererModule,
        JigsawAutoCompleteInputModule
    ],
    declarations: [TableProgressDemoComponent],
    exports: [TableProgressDemoComponent]
})
export class TableProgressDemoModule {
}
