import {NgModule} from "@angular/core";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ListLitePresetValueDemoComponent} from "./demo.component";
import {JigsawListLiteModule} from "jigsaw/component/list-and-tile/list-lite";

@NgModule({
    imports: [
        JigsawListLiteModule, JigsawDemoDescriptionModule
    ],
    declarations: [ListLitePresetValueDemoComponent],
    exports: [ListLitePresetValueDemoComponent]
})
export class ListLitePresetValueDemoModule {
}
