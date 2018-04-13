import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawBox} from "./box";
import {JigsawBoxResizable} from "./box-resizable";
import {JigsawCommonModule} from "../common";
import {JigsawEditableBox} from "./editable-box";

@NgModule({
    imports: [CommonModule, JigsawCommonModule],
    declarations: [JigsawBox, JigsawEditableBox, JigsawBoxResizable],
    exports: [JigsawBox, JigsawEditableBox],
})
export class JigsawBoxModule {

}

export * from "./common-box";
export * from "./box";
export * from "./editable-box";
