import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawComboSelectModule, JigsawListLiteModule, JigsawNumericInputModule, JigsawSwitchModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {ListLiteOptionsDemoComponent} from "./demo.component";

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    imports: [
        JigsawListLiteModule, CommonModule, JigsawComboSelectModule,
        JigsawDemoDescriptionModule, JigsawNumericInputModule, JigsawSwitchModule
    , JigsawHeaderModule],
    declarations: [ListLiteOptionsDemoComponent],
    exports: [ListLiteOptionsDemoComponent]
})
export class ListLiteOptionsDemoModule {
}
