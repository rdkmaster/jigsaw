import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawMobileListLiteModule} from "jigsaw/mobile_public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ListLiteFullDemoComponent} from "./demo.component";

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
