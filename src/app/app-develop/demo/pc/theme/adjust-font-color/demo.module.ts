import {NgModule} from "@angular/core";
import {JigsawButtonModule, JigsawHeaderModule, JigsawInputModule, JigsawTagModule, JigsawColorSelectModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";
import {AdjustFontColorDemoComponent} from "./demo.component";
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [AdjustFontColorDemoComponent],
    exports: [ AdjustFontColorDemoComponent ],
    imports: [JigsawButtonModule, JigsawDemoDescriptionModule,
        JigsawHeaderModule, JigsawInputModule, JigsawTagModule,
        JigsawColorSelectModule, CommonModule]
})
export class AdjustFontColorDemoModule{

}
