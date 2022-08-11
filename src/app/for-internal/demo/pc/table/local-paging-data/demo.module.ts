import {NgModule} from '@angular/core';
import {JigsawTableModule, JigsawPaginationModule, JigsawButtonModule} from "jigsaw/public_api";
import {LocalPagingDataDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";

@NgModule({
    imports: [JigsawTableModule, JigsawPaginationModule, JigsawDemoDescriptionModule, JigsawButtonModule],
    declarations: [LocalPagingDataDemoComponent],
    exports: [LocalPagingDataDemoComponent]
})
export class LocalPagingDataDemoModule {
}
