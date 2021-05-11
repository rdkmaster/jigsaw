import { NgModule } from "@angular/core";
import { JigsawPaginationModule, JigsawSwitchModule, JigsawHeaderModule } from "jigsaw/public_api";
import { JigsawDemoDescriptionModule } from "app/demo-description/demo-description";
import { PaginationSizeDemoComponent } from "./demo.component";

@NgModule({
    declarations: [PaginationSizeDemoComponent],
    exports: [PaginationSizeDemoComponent],
    imports: [JigsawPaginationModule, JigsawSwitchModule, JigsawDemoDescriptionModule, JigsawHeaderModule]
})
export class PaginationSizeDemoModule {}
