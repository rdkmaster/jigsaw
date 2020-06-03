import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawTimeModule, JigsawTileSelectModule} from "jigsaw/public_api";
import {TimeLimitStartComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [CommonModule, JigsawTimeModule, JigsawTileSelectModule, JigsawDemoDescriptionModule],
    declarations: [TimeLimitStartComponent],
    exports: [TimeLimitStartComponent]
})
export class TimeLimitStartDemoModule {
}
