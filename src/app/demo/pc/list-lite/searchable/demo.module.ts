import {NgModule} from "@angular/core";
import {JigsawButtonModule, JigsawListLiteModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ListLiteSearchableDemoComponent} from "./demo.component";

@NgModule({
    imports: [
        JigsawListLiteModule, JigsawDemoDescriptionModule, JigsawButtonModule
    ],
    declarations: [ListLiteSearchableDemoComponent],
    exports: [ListLiteSearchableDemoComponent]
})
export class ListLiteSearchableDemoModule {
}
