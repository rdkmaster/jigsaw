import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import {JigsawBox} from "./box";
import {JigsawEditableBox} from "./editable-box";
import {JigsawBoxResizable} from "./box-resizable";
import {JigsawCommonModule} from "../../common/common";

@NgModule({
    imports: [CommonModule, JigsawCommonModule, PerfectScrollbarModule],
    declarations: [JigsawBox, JigsawBoxResizable, JigsawEditableBox],
    exports: [JigsawBox, JigsawEditableBox],
})
export class JigsawBoxModule {
}

export * from "./common-box";
export * from "./box";
export * from "./editable-box";
