import {NgModule} from "@angular/core";
import {JigsawMobileListLiteModule} from "jigsaw/mobile_public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ListLiteLineEllipsisDemoComponent} from "./demo.component";

@NgModule({
    imports: [
        JigsawMobileListLiteModule, JigsawDemoDescriptionModule
    ],
    declarations: [ListLiteLineEllipsisDemoComponent],
    exports: [ListLiteLineEllipsisDemoComponent]
})
export class ListLiteLineEllipsisDemoModule {
}
