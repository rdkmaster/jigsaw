import {NgModule} from '@angular/core';
import {JigsawButtonModule, JigsawHeaderModule, JigsawTableModule, JigsawSelectModule, JigsawPaginationModule, JigsawSwitchModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TableAutoFillUpDemoComponent} from './demo.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [JigsawTableModule, JigsawDemoDescriptionModule, JigsawHeaderModule, JigsawButtonModule,
        JigsawSelectModule, CommonModule, JigsawPaginationModule, JigsawSwitchModule],
    declarations: [TableAutoFillUpDemoComponent],
    exports: [TableAutoFillUpDemoComponent]
})
export class TableAutoFillUpDemoModule {
}
