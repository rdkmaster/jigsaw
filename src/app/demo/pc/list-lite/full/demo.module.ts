import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawComboSelectModule, JigsawListLiteModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ListLiteFullDemoComponent} from "./demo.component";

@NgModule({
    imports: [
        JigsawListLiteModule, CommonModule, JigsawComboSelectModule,
        JigsawDemoDescriptionModule
    ],
    declarations: [ListLiteFullDemoComponent],
    exports: [ListLiteFullDemoComponent]
})
export class ListLiteFullDemoModule {
}
