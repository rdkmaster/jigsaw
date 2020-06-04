import {NgModule} from "@angular/core";
import {JigsawComboSelectModule, JigsawListLiteModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ListLiteWithComboDemoComponent} from "./demo.component";

@NgModule({
    imports: [
        JigsawListLiteModule, JigsawComboSelectModule, JigsawDemoDescriptionModule
    ],
    declarations: [ListLiteWithComboDemoComponent],
    exports: [ListLiteWithComboDemoComponent]
})
export class ListLiteWithComboDemoModule {
}
