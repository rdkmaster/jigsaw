import {NgModule} from "@angular/core";
import {JigsawComboSelectModule, JigsawListLiteModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ListLiteWithComboDemoComponent} from "./demo.component";

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    imports: [
        JigsawListLiteModule, JigsawComboSelectModule, JigsawDemoDescriptionModule
    , JigsawHeaderModule],
    declarations: [ListLiteWithComboDemoComponent],
    exports: [ListLiteWithComboDemoComponent]
})
export class ListLiteWithComboDemoModule {
}
