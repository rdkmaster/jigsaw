import {NgModule} from "@angular/core";
import {JigsawListLiteModule, JigsawSwitchModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ListLiteWithIconDemoComponent} from "./demo.component";

@NgModule({
    imports: [
        JigsawListLiteModule, JigsawDemoDescriptionModule, JigsawSwitchModule
    ],
    declarations: [ListLiteWithIconDemoComponent],
    exports: [ListLiteWithIconDemoComponent]
})
export class ListLiteWithIconDemoModule {
}
