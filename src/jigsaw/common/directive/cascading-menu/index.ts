import {NgModule} from "@angular/core";
import {JigsawCascadingMenu,} from "./cascading-menu";
import {PopupService} from "../../service/popup.service";
import {MenuComponent} from "./menu";
import {JigsawListModule} from "../../../pc-components/list-and-tile/list";
import {JigsawFloatModule} from "../float";
import {CommonModule} from "@angular/common";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";

@NgModule({
    declarations: [JigsawCascadingMenu, MenuComponent],
    exports: [JigsawCascadingMenu],
    providers: [PopupService],
    imports: [JigsawListModule, JigsawFloatModule, CommonModule, PerfectScrollbarModule],
    entryComponents: [MenuComponent]
})
export class JigsawCascadingMenuModule {
}

export * from './cascading-menu';

