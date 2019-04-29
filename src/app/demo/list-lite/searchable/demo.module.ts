import {NgModule} from "@angular/core";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ListLiteSearchableDemoComponent} from "./demo.component";
import {JigsawListLiteModule} from "jigsaw/pc-components/list-and-tile/list-lite";

@NgModule({
    imports: [
        JigsawListLiteModule, JigsawDemoDescriptionModule
    ],
    declarations: [ListLiteSearchableDemoComponent],
    exports: [ListLiteSearchableDemoComponent]
})
export class ListLiteSearchableDemoModule {
}
