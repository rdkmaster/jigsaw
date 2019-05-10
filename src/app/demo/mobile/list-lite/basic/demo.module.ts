import {NgModule} from "@angular/core";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ListLiteBasicDemoComponent} from "./demo.component";
import {JigsawMobileListLiteModule} from "jigsaw/mobile-components/list-and-tile/list-lite";

@NgModule({
    imports: [
        JigsawMobileListLiteModule, JigsawDemoDescriptionModule
    ],
    declarations: [ListLiteBasicDemoComponent],
    exports: [ListLiteBasicDemoComponent]
})
export class ListLiteBasicDemoModule {
}
