import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawBox} from "./box";
import {JigsawBoxResizable} from "./box-resizable";
import {JigsawCommonModule} from "../common";
import {JigsawEditableBox} from "./editable-box";
import {JigsawTabsWrapper, JigsawTabsWrapperModule} from "./tabs-wrapper/tabs-wrapper";

@NgModule({
    imports: [CommonModule, JigsawCommonModule, JigsawTabsWrapperModule],
    declarations: [JigsawBox, JigsawEditableBox, JigsawBoxResizable],
    exports: [JigsawBox, JigsawEditableBox],
    entryComponents: [JigsawTabsWrapper, JigsawEditableBox]
})
export class JigsawBoxModule {

}

export * from "./common-box";
export * from "./box";
export * from "./editable-box";
