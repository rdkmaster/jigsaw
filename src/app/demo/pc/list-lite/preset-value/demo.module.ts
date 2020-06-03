import {NgModule} from "@angular/core";
import {JigsawListLiteModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ListLitePresetValueDemoComponent} from "./demo.component";

@NgModule({
    imports: [
        JigsawListLiteModule, JigsawDemoDescriptionModule
    ],
    declarations: [ListLitePresetValueDemoComponent],
    exports: [ListLitePresetValueDemoComponent]
})
export class ListLitePresetValueDemoModule {
}
