import {NgModule} from "@angular/core";
import {JigsawListLiteModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ListLiteBasicDemoComponent} from "./demo.component";

@NgModule({
    imports: [
        JigsawListLiteModule, JigsawDemoDescriptionModule
    ],
    declarations: [ListLiteBasicDemoComponent],
    exports: [ListLiteBasicDemoComponent]
})
export class ListLiteBasicDemoModule {
}
