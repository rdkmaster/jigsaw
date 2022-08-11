import { NgModule } from "@angular/core";
import {JigsawPaginationModule, JigsawSwitchModule, JigsawHeaderModule, JigsawButtonModule} from "jigsaw/public_api";
import { JigsawDemoDescriptionModule } from "app/for-internal/description/demo-description";
import { PaginationSizeDemoComponent } from "./demo.component";

@NgModule({
    declarations: [PaginationSizeDemoComponent],
    exports: [PaginationSizeDemoComponent],
    imports: [JigsawPaginationModule, JigsawSwitchModule, JigsawButtonModule, JigsawDemoDescriptionModule, JigsawHeaderModule]
})
export class PaginationSizeDemoModule {}
