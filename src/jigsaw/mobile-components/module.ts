import {NgModule} from "@angular/core";

import {JigsawBlockModule} from '../common/components/block/block';
import {JigsawMobileButtonModule} from './button/button';
import {JigsawLoadingModule} from '../common/components/loading/loading';
import {JigsawScrollbarModule} from '../common/components/scrollbar/index';
import {JigsawMovableModule} from "../common/directive/movable/index";
import {JigsawFloatModule} from "../common/directive/float/float";
import {JigsawDraggableModule, JigsawDroppableModule} from '../common/directive/dragdrop/index';
import {JigsawCommonModule} from "../common/common";
import {JigsawTrustedHtmlModule} from "../common/directive/trusted-html/trusted-html";

const JIGSAW_MODULE = [
    JigsawBlockModule,
    JigsawMobileButtonModule,
    JigsawScrollbarModule,
    JigsawCommonModule,
    JigsawDraggableModule,
    JigsawDroppableModule,
    JigsawLoadingModule,
    JigsawMovableModule,
    JigsawFloatModule,
    JigsawTrustedHtmlModule
];

@NgModule({
    exports: JIGSAW_MODULE
})
export class JigsawModule {
}
