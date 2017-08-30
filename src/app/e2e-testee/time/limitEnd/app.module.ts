import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { JigsawTimeModule } from "jigsaw/component/time/index";
import { JigsawTileSelectModule } from "jigsaw/component/tile-select/tile-select";
import { TimeLimitEndComponent }  from './app.component';

@NgModule({
    imports: [ CommonModule, JigsawTimeModule, JigsawTileSelectModule ],
    declarations: [ TimeLimitEndComponent ],
    bootstrap: [ TimeLimitEndComponent ]
})
export class TimeLimitEndDemoModule {}
