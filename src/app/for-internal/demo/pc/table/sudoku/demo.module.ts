import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawTableModule, JigsawTileSelectModule, JigsawAlertModule, JigsawButtonModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {SudokuGameComponent} from './demo.component';
import {NumberRenderer} from "./number-renderer";
import {NumberSelectPad} from "./number-select-pad";

@NgModule({
    imports: [
        CommonModule, JigsawTableModule, JigsawDemoDescriptionModule,
        JigsawAlertModule, JigsawTileSelectModule, JigsawButtonModule
    ],
    declarations: [SudokuGameComponent, NumberRenderer, NumberSelectPad],
    exports: [SudokuGameComponent]
})
export class SodokuGameModule {
}
