import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JigsawListModule, JigsawHeaderModule } from "jigsaw/public_api";
import { JigsawDemoDescriptionModule } from "app/for-internal/description/demo-description";
import { ListTrackItemByDemoComponent } from "./demo.component";

@NgModule({
    imports: [
        JigsawListModule, CommonModule,
        JigsawDemoDescriptionModule, JigsawHeaderModule
    ],
    declarations: [ListTrackItemByDemoComponent],
    exports: [ListTrackItemByDemoComponent]
})
export class ListTrackItemByDemoModule {
}
