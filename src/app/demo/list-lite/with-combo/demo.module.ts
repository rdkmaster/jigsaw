import {NgModule} from "@angular/core";
import {JigsawComboSelectModule} from "jigsaw/component/combo-select/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ListLiteWithComboDemoComponent} from "./demo.component";
import {JigsawListLiteModule} from "jigsaw/component/list-and-tile/list-lite";

@NgModule({
    imports: [
        JigsawListLiteModule, JigsawComboSelectModule, JigsawDemoDescriptionModule
    ],
    declarations: [ListLiteWithComboDemoComponent],
    exports: [ListLiteWithComboDemoComponent]
})
export class ListLiteWithComboDemoModule {
}
