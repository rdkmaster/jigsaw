import { NgModule } from "@angular/core";
import {
    JigsawNumericInputModule,
    JigsawHeaderModule
} from "jigsaw/public_api";
import { JigsawDemoDescriptionModule } from "app/demo-description/demo-description";
import { NumericInputShowOptionDemoComponent } from "./demo.component";

@NgModule({
    declarations: [NumericInputShowOptionDemoComponent],
    exports: [NumericInputShowOptionDemoComponent],
    imports: [
        JigsawNumericInputModule,
        JigsawDemoDescriptionModule,
        JigsawHeaderModule
    ]
})
export class NumericInputShowOptionDemoModule {}
