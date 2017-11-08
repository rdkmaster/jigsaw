import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawListModule} from "jigsaw/component/list-and-tile/list";
import {JigsawCheckBoxModule} from "jigsaw/component/checkbox/index";
import {JigsawComboSelectModule} from "jigsaw/component/combo-select/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ListFullDemoComponent} from "./app.component";

@NgModule({
    imports: [
        JigsawListModule, CommonModule, JigsawCheckBoxModule, JigsawComboSelectModule,
        JigsawDemoDescriptionModule
    ],
    declarations: [ListFullDemoComponent],
    bootstrap: [ListFullDemoComponent]
})
export class ListFullDemoModule {
}
