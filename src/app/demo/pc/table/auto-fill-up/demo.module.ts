import {NgModule} from '@angular/core';
import {JigsawButtonModule, JigsawHeaderModule, JigsawTableModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TableAutoFillUpDemoComponent} from './demo.component';

@NgModule({
    imports: [JigsawTableModule, JigsawDemoDescriptionModule, JigsawHeaderModule, JigsawButtonModule],
    declarations: [TableAutoFillUpDemoComponent],
    exports: [TableAutoFillUpDemoComponent]
})
export class TableAutoFillUpDemoModule {
}
