import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawComboSelectModule} from "jigsaw/pc-components/combo-select/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ListLiteFullDemoComponent} from "./demo.component";
import {JigsawListLiteModule} from "jigsaw/pc-components/list-and-tile/list-lite";

@NgModule({
    imports: [
        JigsawListLiteModule, CommonModule, JigsawComboSelectModule,
        JigsawDemoDescriptionModule
    ],
    declarations: [ListLiteFullDemoComponent],
    exports: [ListLiteFullDemoComponent]
})
export class ListLiteFullDemoModule {
}
