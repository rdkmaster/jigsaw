import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawCascadingMenu,} from "./cascading-menu";
import {PopupService} from "../../service/popup.service";
import {JigsawMenuComponent} from "../../../pc-components/menu/menu";

@NgModule({
    declarations: [JigsawCascadingMenu],
    exports: [JigsawCascadingMenu],
    providers: [PopupService],
    imports: [CommonModule],
    entryComponents: [JigsawMenuComponent]
})
export class JigsawCascadingMenuModule {
}

export * from './cascading-menu';
