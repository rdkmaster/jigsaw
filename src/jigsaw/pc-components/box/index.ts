import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawBox} from "./box";
import {JigsawBoxResizable} from "./box-resizable";
import {JigsawCommonModule} from "../../common/common";

@NgModule({
    imports: [CommonModule, JigsawCommonModule],
    declarations: [JigsawBox, JigsawBoxResizable],
    exports: [JigsawBox],
})
export class JigsawBoxModule {
}

export * from "./common-box";
export * from "./box";
