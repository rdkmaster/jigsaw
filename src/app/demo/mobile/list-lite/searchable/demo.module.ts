import {NgModule} from "@angular/core";
import {JigsawMobileListLiteModule} from "jigsaw/mobile_public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ListLiteSearchableDemoComponent} from "./demo.component";

@NgModule({
    imports: [
        JigsawMobileListLiteModule, JigsawDemoDescriptionModule
    ],
    declarations: [ListLiteSearchableDemoComponent],
    exports: [ListLiteSearchableDemoComponent]
})
export class ListLiteSearchableDemoModule {
}
