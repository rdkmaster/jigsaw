import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import {
    JigsawBoxModule,
    JigsawButtonBarModule, JigsawButtonModule,
    JigsawDraggableModule,
    JigsawDroppableModule,
    JigsawGraphModule,
    JigsawIconModule
} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {BoxLayoutInteractionDemoComponent} from "./demo.component";
import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    declarations: [BoxLayoutInteractionDemoComponent],
    exports: [BoxLayoutInteractionDemoComponent],
    imports: [JigsawDemoDescriptionModule, JigsawBoxModule, CommonModule, JigsawHeaderModule, JigsawIconModule, JigsawButtonBarModule, JigsawGraphModule,
        JigsawDroppableModule, JigsawDraggableModule, JigsawButtonModule, PerfectScrollbarModule]
})
export class BoxLayoutInteractionDemoModule {

}
