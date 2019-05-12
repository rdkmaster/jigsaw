import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawTableModule} from "jigsaw/pc-components/table/table";
import {JigsawTileSelectModule} from "jigsaw/pc-components/list-and-tile/tile";
import {JigsawAlertModule} from "jigsaw/pc-components/alert/alert";
import {JigsawButtonModule} from "jigsaw/pc-components/button/button";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {SudokuGameComponent} from './demo.component';
import {NumberRenderer} from "./number-renderer";
import {NumberSelectPad} from "./number-select-pad";

@NgModule({
    imports: [
        CommonModule, JigsawTableModule, JigsawDemoDescriptionModule,
        JigsawAlertModule, JigsawTileSelectModule, JigsawButtonModule
    ],
    declarations: [SudokuGameComponent, NumberRenderer, NumberSelectPad],
    exports: [SudokuGameComponent],
    entryComponents: [NumberRenderer, NumberSelectPad]
})
export class SodokuGameModule {
}
