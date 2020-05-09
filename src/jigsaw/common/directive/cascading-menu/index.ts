import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import {JigsawCascadingMenu,} from "./cascading-menu";
import {PopupService} from "../../service/popup.service";
import {JigsawMenuComponent} from "./menu";
import {JigsawListModule} from "../../../pc-components/list-and-tile/list";
import {JigsawFloatModule} from "../float";

@NgModule({
    declarations: [JigsawCascadingMenu, JigsawMenuComponent],
    exports: [JigsawCascadingMenu],
    providers: [PopupService],
    imports: [JigsawListModule, JigsawFloatModule, CommonModule, PerfectScrollbarModule],
    entryComponents: [JigsawMenuComponent]
})
export class JigsawCascadingMenuModule {
}

export * from './cascading-menu';

