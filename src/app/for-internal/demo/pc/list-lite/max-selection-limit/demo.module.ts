import {NgModule} from "@angular/core";
import {JigsawListLiteModule, JigsawNumericInputModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {ListLiteMaxSelectionLimitDemoComponent} from "./demo.component";
import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    imports: [
        JigsawListLiteModule, JigsawDemoDescriptionModule, JigsawHeaderModule, JigsawNumericInputModule],
    declarations: [ListLiteMaxSelectionLimitDemoComponent],
    exports: [ListLiteMaxSelectionLimitDemoComponent]
})
export class ListLiteMaxSelectionLimitDemoModule {
}
