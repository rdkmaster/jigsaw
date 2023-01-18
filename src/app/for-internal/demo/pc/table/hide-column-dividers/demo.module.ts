import { NgModule } from '@angular/core';
import { JigsawTableModule, JigsawPaginationModule } from "jigsaw/public_api";
import { HideColumnDividersDemoComponent } from './demo.component';
import { JigsawDemoDescriptionModule } from "app/for-internal/description/demo-description";

@NgModule({
    imports: [JigsawTableModule, JigsawPaginationModule, JigsawDemoDescriptionModule],
    declarations: [HideColumnDividersDemoComponent],
    exports: [HideColumnDividersDemoComponent]
})
export class HideColumnDividersDemoModule {
}
