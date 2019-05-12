import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawTimeModule} from "jigsaw/pc-components/time/index";
import {JigsawTileSelectModule} from "jigsaw/pc-components/list-and-tile/tile";
import {TimeLimitEndComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [CommonModule, JigsawTimeModule, JigsawTileSelectModule, JigsawDemoDescriptionModule],
    declarations: [TimeLimitEndComponent],
    exports: [TimeLimitEndComponent]
})
export class TimeLimitEndDemoModule {
}
