import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawMobileListModule} from "jigsaw/mobile-components/list-and-tile/list";
import {JigsawMobileCheckBoxModule} from "jigsaw/mobile-components/checkbox/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ListFullDemoComponent} from "./demo.component";

@NgModule({
    imports: [
        JigsawMobileListModule, CommonModule, JigsawMobileCheckBoxModule,
        JigsawDemoDescriptionModule
    ],
    declarations: [ListFullDemoComponent],
    exports: [ListFullDemoComponent]
})
export class ListFullDemoModule {
}
