import {NgModule} from "@angular/core";
import {JigsawComboSelectModule} from "jigsaw/pc-components/combo-select/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ListLiteWithComboDemoComponent} from "./demo.component";
import {JigsawListLiteModule} from "jigsaw/pc-components/list-and-tile/list-lite";

@NgModule({
    imports: [
        JigsawListLiteModule, JigsawComboSelectModule, JigsawDemoDescriptionModule
    ],
    declarations: [ListLiteWithComboDemoComponent],
    exports: [ListLiteWithComboDemoComponent]
})
export class ListLiteWithComboDemoModule {
}
