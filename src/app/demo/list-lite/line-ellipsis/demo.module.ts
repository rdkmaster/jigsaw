import {NgModule} from "@angular/core";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ListLiteLineEllipsisDemoComponent} from "./demo.component";
import {JigsawListLiteModule} from "jigsaw/component/list-and-tile/list-lite";

@NgModule({
    imports: [
        JigsawListLiteModule, JigsawDemoDescriptionModule
    ],
    declarations: [ListLiteLineEllipsisDemoComponent],
    exports: [ListLiteLineEllipsisDemoComponent]
})
export class ListLiteLineEllipsisDemoModule {
}
