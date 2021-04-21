import { NgModule } from "@angular/core";
import {
    JigsawNumericInputModule,
    JigsawHeaderModule,
    JigsawSwitchModule
} from "jigsaw/public_api";
import { JigsawDemoDescriptionModule } from "app/demo-description/demo-description";
import { NumericInputShowOptionDemoComponent } from "./demo.component";

@NgModule({
    declarations: [NumericInputShowOptionDemoComponent],
    exports: [NumericInputShowOptionDemoComponent],
    imports: [
        JigsawNumericInputModule,
        JigsawDemoDescriptionModule,
        JigsawHeaderModule, JigsawSwitchModule
    ]
})
export class NumericInputShowOptionDemoModule {}
