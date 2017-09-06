import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { JigsawTimeModule } from "jigsaw/component/time/index";
import { JigsawTileSelectModule } from "jigsaw/component/list-and-tile/tile";
import { TimeLimitEndComponent }  from './app.component';

@NgModule({
    imports: [ CommonModule, JigsawTimeModule, JigsawTileSelectModule ],
    declarations: [ TimeLimitEndComponent ],
    bootstrap: [ TimeLimitEndComponent ]
})
export class TimeLimitEndDemoModule {}
