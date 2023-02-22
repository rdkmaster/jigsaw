import { NgModule } from '@angular/core';
import { JigsawButtonModule, JigsawHeaderModule, JigsawPaginationModule, JigsawTableModule } from "jigsaw/public_api";
import { JigsawDemoDescriptionModule } from "app/for-internal/description/demo-description";
import { TableDownloadDemoComponent } from './demo.component';

@NgModule({
    imports: [JigsawTableModule, JigsawDemoDescriptionModule, JigsawHeaderModule, JigsawButtonModule,
        JigsawPaginationModule],
    declarations: [TableDownloadDemoComponent],
    exports: [TableDownloadDemoComponent]
})
export class TableDownloadDemoModule {
}
