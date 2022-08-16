import {NgModule} from '@angular/core';
import {JigsawTableModule, JigsawPaginationModule, JigsawButtonModule} from "jigsaw/public_api";
import {LocalPagingDataDemoComponent} from './demo.component';


@NgModule({
    imports: [JigsawTableModule, JigsawPaginationModule,  JigsawButtonModule],
    declarations: [LocalPagingDataDemoComponent],
    exports: [LocalPagingDataDemoComponent]
})
export class LocalPagingDataDemoModule {
}
