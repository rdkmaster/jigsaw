import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawTimeModule} from "jigsaw/component/time/index";
import {JigsawTileSelectModule} from "jigsaw/component/list-and-tile/tile";
import {TimeLimitEndComponent} from './app.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [CommonModule, JigsawTimeModule, JigsawTileSelectModule, JigsawDemoDescriptionModule],
    declarations: [TimeLimitEndComponent],
    exports: [TimeLimitEndComponent]
})
export class TimeLimitEndDemoModule {
}
