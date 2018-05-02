import {NgModule} from "@angular/core";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ListLiteBasicDemoComponent} from "./demo.component";
import {JigsawListLiteModule} from "jigsaw/component/list-and-tile/list-lite";

@NgModule({
    imports: [
        JigsawListLiteModule, JigsawDemoDescriptionModule
    ],
    declarations: [ListLiteBasicDemoComponent],
    exports: [ListLiteBasicDemoComponent]
})
export class ListLiteBasicDemoModule {
}
