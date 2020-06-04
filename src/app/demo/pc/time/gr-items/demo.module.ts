import {NgModule} from '@angular/core';
import {JigsawTimeModule} from "jigsaw/public_api";
import {TimeGrItemsComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTimeModule, JigsawDemoDescriptionModule],
    declarations: [TimeGrItemsComponent],
    exports: [TimeGrItemsComponent]
})
export class TimeGrItemsDemoModule {
}
