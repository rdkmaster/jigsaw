import {NgModule} from "@angular/core";
import {JigsawListLiteModule, JigsawSwitchModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";
import {ListLiteWithIconDemoComponent} from "./demo.component";

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    imports: [
        JigsawListLiteModule, JigsawDemoDescriptionModule, JigsawSwitchModule
    , JigsawHeaderModule],
    declarations: [ListLiteWithIconDemoComponent],
    exports: [ListLiteWithIconDemoComponent]
})
export class ListLiteWithIconDemoModule {
}
