import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawMobileListModule, JigsawMobileCheckBoxModule} from "jigsaw/mobile_public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ListFullDemoComponent} from "./demo.component";

@NgModule({
    imports: [
        JigsawMobileListModule, CommonModule, JigsawMobileCheckBoxModule,
        JigsawDemoDescriptionModule
    ],
    declarations: [ListFullDemoComponent],
    exports: [ListFullDemoComponent]
})
export class ListFullDemoModule {
}
