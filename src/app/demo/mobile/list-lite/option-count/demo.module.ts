import {NgModule} from "@angular/core";
import {JigsawMobileListLiteModule} from "jigsaw/mobile_public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ListLiteOptionCountDemoComponent} from "./demo.component";

@NgModule({
    imports: [
        JigsawMobileListLiteModule, JigsawDemoDescriptionModule
    ],
    declarations: [ListLiteOptionCountDemoComponent],
    exports: [ListLiteOptionCountDemoComponent]
})
export class ListLiteOptionCountDemoModule {
}
