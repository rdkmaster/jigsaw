import { NgModule } from '@angular/core';
import { JigsawTableModule, JigsawPaginationModule } from "jigsaw/public_api";
import { RemoveVerticalLinesDemoComponent } from './demo.component';
import { JigsawDemoDescriptionModule } from "app/for-internal/description/demo-description";

@NgModule({
    imports: [JigsawTableModule, JigsawPaginationModule, JigsawDemoDescriptionModule],
    declarations: [RemoveVerticalLinesDemoComponent],
    exports: [RemoveVerticalLinesDemoComponent]
})
export class RemoveVerticalLinesDemoModule {
}
