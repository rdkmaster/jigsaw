import { NgModule } from '@angular/core';
import { JigsawButtonBarModule, JigsawNumericInputModule, JigsawTableModule } from "jigsaw/public_api";
import { JigsawDemoDescriptionModule } from "app/for-internal/description/demo-description";
import { TableFreezeColumnDemoComponent } from './demo.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

@NgModule({
    imports: [JigsawTableModule, JigsawDemoDescriptionModule, PerfectScrollbarModule, JigsawNumericInputModule,
        JigsawButtonBarModule],
    declarations: [TableFreezeColumnDemoComponent],
    exports: [TableFreezeColumnDemoComponent]
})
export class TableFreezeColumnDemoModule {
}
