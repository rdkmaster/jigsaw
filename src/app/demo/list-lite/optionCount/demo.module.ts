import {NgModule} from "@angular/core";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ListLiteOptionCountDemoComponent} from "./demo.component";
import {JigsawListLiteModule} from "jigsaw/component/list-and-tile/list-lite";

@NgModule({
    imports: [
        JigsawListLiteModule, JigsawDemoDescriptionModule
    ],
    declarations: [ListLiteOptionCountDemoComponent],
    exports: [ListLiteOptionCountDemoComponent]
})
export class ListLiteOptionCountDemoModule {
}
