import {NgModule} from "@angular/core";
import {JigsawButtonModule, JigsawHeaderModule, JigsawInputModule, JigsawTagModule, JigsawColorSelectModule} from "jigsaw/public_api";

import {AdjustFontColorDemoComponent} from "./demo.component";
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [AdjustFontColorDemoComponent],
    exports: [ AdjustFontColorDemoComponent ],
    imports: [JigsawButtonModule, 
        JigsawHeaderModule, JigsawInputModule, JigsawTagModule,
        JigsawColorSelectModule, CommonModule]
})
export class AdjustFontColorDemoModule{

}
