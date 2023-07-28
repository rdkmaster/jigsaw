import {NgModule} from "@angular/core";
import {JigsawBigNumberModule, JigsawBoxModule, JigsawButtonModule, JigsawHeaderModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {BigNumberCommonDemoComponent} from "./demo.component";
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [BigNumberCommonDemoComponent],
    imports: [
        CommonModule,JigsawDemoDescriptionModule, JigsawBigNumberModule, JigsawButtonModule, JigsawBoxModule, JigsawHeaderModule
    ],
    exports: [BigNumberCommonDemoComponent]
})
export class BigNumberCommonDemoModule {
}
