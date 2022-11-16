import { NgModule } from "@angular/core";
import {
    JigsawTableModule,
    JigsawPaginationModule,
    JigsawButtonModule,
    JigsawSwitchModule,
    JigsawRadioLiteModule,
    JigsawHeaderModule
} from "jigsaw/public_api";
import { TableSetHeaderFilterDemoComponent } from "./demo.component";
import { JigsawDemoDescriptionModule } from "app/for-internal/description/demo-description";

@NgModule({
    imports: [
        JigsawTableModule,
        JigsawPaginationModule,
        JigsawButtonModule,
        JigsawDemoDescriptionModule,
        JigsawHeaderModule,
        JigsawSwitchModule,
        JigsawRadioLiteModule
    ],
    declarations: [TableSetHeaderFilterDemoComponent],
    exports: [TableSetHeaderFilterDemoComponent],
})
export class TableSetHeaderFilterDemoModule {}
