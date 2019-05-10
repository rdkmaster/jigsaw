import {NgModule} from "@angular/core";

import {JigsawMobileAlertModule} from './alert/alert';
import {JigsawBlockModule} from '../common/components/block/block';
import {JigsawMobileButtonModule} from './button/button';
import {JigsawMobileCheckBoxModule} from './checkbox/index';
import {JigsawMobileDialogModule} from './dialog/dialog';
import {JigsawMobileGraph} from './graph/index';
import {JigsawMobileInputModule} from './input/input';
import {JigsawLoadingModule} from '../common/components/loading/loading';
import {JigsawMobileRadioModule} from './radio/radio';
import {JigsawScrollbarModule} from '../common/components/scrollbar/index';
import {JigsawMobileSliderModule} from './slider/index';
import {JigsawMobileSwitchModule} from './switch/index';
import {JigsawMobileTabsModule} from './tabs/index';
import {JigsawMobileTagModule} from './tag/tag';
import {JigsawMobileTileSelectModule} from './list-and-tile/tile';
import {JigsawMovableModule} from "../common/directive/movable/index";
import {JigsawFloatModule} from "../common/directive/float/index";
import {JigsawDraggableModule, JigsawDroppableModule} from '../common/directive/dragdrop/index';
import {JigsawMobileRootModule} from "./root/root";
import {JigsawCommonModule} from "../common/common";
import {JigsawMobileListModule} from "./list-and-tile/list";
import {JigsawTrustedHtmlModule} from "../common/directive/trusted-html/trusted-html";
import {JigsawMobileListLiteModule} from "./list-and-tile/list-lite";
import {JigsawMobileTileLiteModule} from "./list-and-tile/tile-lite";
import {JigsawMobileRadioLiteModule} from "./radio/radio-lite";
import {JigsawMobileButtonBarModule} from "./list-and-tile/button-bar";
import {JigsawMobileIconModule} from "./icon/icon";
import {JigsawMobileRateModule} from "./rate/index";

const JIGSAW_MODULE = [
    JigsawMobileAlertModule,
    JigsawBlockModule,
    JigsawMobileButtonModule,
    JigsawMobileCheckBoxModule,
    JigsawMobileDialogModule,
    JigsawMobileInputModule,
    JigsawMobileRadioModule,
    JigsawMobileTileSelectModule,
    JigsawMobileGraph,
    JigsawScrollbarModule,
    JigsawMobileRootModule,
    JigsawMobileSliderModule,
    JigsawMobileListModule,
    JigsawMobileSwitchModule,
    JigsawMobileTagModule,
    JigsawMobileTabsModule,
    JigsawCommonModule,
    JigsawDraggableModule,
    JigsawDroppableModule,
    JigsawLoadingModule,
    JigsawMovableModule,
    JigsawFloatModule,
    JigsawTrustedHtmlModule,
    JigsawMobileListLiteModule,
    JigsawMobileTileLiteModule,
    JigsawMobileRadioLiteModule,
    JigsawMobileButtonBarModule,
    JigsawMobileIconModule,
    JigsawMobileRateModule
];

@NgModule({
    exports: JIGSAW_MODULE
})
export class JigsawModule {
}
