import {NgModule} from '@angular/core';
import {CustomTabComponent} from './demo.component';
import {JigsawTabsModule} from "jigsaw/component/tabs/index";
import {JigsawCommonModule} from "jigsaw/component/common";
import {CommonModule} from "@angular/common";
import {JigsawDialogModule} from "jigsaw/component/dialog/dialog";
import {JigsawTileSelectModule} from "jigsaw/component/list-and-tile/tile";

@NgModule({
    imports: [JigsawTabsModule, JigsawCommonModule, CommonModule, JigsawDialogModule, JigsawTileSelectModule],
    declarations: [CustomTabComponent],
    exports: [CustomTabComponent]
})
export class CustomTabModule {
}
