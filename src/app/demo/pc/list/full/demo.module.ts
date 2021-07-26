import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawListModule, JigsawCheckBoxModule, JigsawComboSelectModule, JigsawHeaderModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ListFullDemoComponent} from "./demo.component";

@NgModule({
    imports: [
        JigsawListModule, CommonModule, JigsawCheckBoxModule, JigsawComboSelectModule,
        JigsawDemoDescriptionModule, JigsawHeaderModule
    ],
    declarations: [ListFullDemoComponent],
    exports: [ListFullDemoComponent]
})
export class ListFullDemoModule {
}
