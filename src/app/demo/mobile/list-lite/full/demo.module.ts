import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ListLiteFullDemoComponent} from "./demo.component";
import {JigsawMobileListLiteModule} from "jigsaw/mobile-components/list-and-tile/list-lite";

@NgModule({
    imports: [
        JigsawMobileListLiteModule, CommonModule,
        JigsawDemoDescriptionModule
    ],
    declarations: [ListLiteFullDemoComponent],
    exports: [ListLiteFullDemoComponent]
})
export class ListLiteFullDemoModule {
}
