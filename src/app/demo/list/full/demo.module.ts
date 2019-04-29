import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawListModule} from "jigsaw/pc-components/list-and-tile/list";
import {JigsawCheckBoxModule} from "jigsaw/pc-components/checkbox/index";
import {JigsawComboSelectModule} from "jigsaw/pc-components/combo-select/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ListFullDemoComponent} from "./demo.component";

@NgModule({
    imports: [
        JigsawListModule, CommonModule, JigsawCheckBoxModule, JigsawComboSelectModule,
        JigsawDemoDescriptionModule
    ],
    declarations: [ListFullDemoComponent],
    exports: [ListFullDemoComponent]
})
export class ListFullDemoModule {
}
