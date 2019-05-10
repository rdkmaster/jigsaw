import {NgModule} from "@angular/core";


import {JigsawBlockModule} from '../common/components/block/block';
import {JigsawMobileButtonModule} from './button/button';
import {JigsawMobileCheckBoxModule} from './checkbox/index';
import {JigsawLoadingModule} from '../common/components/loading/loading';
import {JigsawMovableModule} from "../common/directive/movable/index";
import {JigsawFloatModule} from "../common/directive/float/index";
import {JigsawDraggableModule, JigsawDroppableModule} from '../common/directive/dragdrop/index';
import {JigsawCommonModule} from "../common/common";
import {JigsawTrustedHtmlModule} from "../common/directive/trusted-html/trusted-html";
import {JigsawMobileRootModule} from "./root/root";
const JIGSAW_MODULE = [
    JigsawBlockModule,
    JigsawMobileButtonModule,
    JigsawMobileCheckBoxModule,
    JigsawCommonModule,
    JigsawDraggableModule,
    JigsawDroppableModule,
    JigsawLoadingModule,
    JigsawMovableModule,
    JigsawFloatModule,
    JigsawTrustedHtmlModule,
    JigsawMobileRootModule
];

@NgModule({
    exports: JIGSAW_MODULE
})
export class JigsawModule {
}
