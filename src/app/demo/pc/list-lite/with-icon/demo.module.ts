import {NgModule} from "@angular/core";
import {JigsawListLiteModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ListLiteWithIconDemoComponent} from "./demo.component";

@NgModule({
    imports: [
        JigsawListLiteModule, JigsawDemoDescriptionModule
    ],
    declarations: [ListLiteWithIconDemoComponent],
    exports: [ListLiteWithIconDemoComponent]
})
export class ListLiteWithIconDemoModule {
}
