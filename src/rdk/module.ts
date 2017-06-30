import {NgModule} from "@angular/core";

import {RdkAlertModule} from './component/alert/alert';
import {RdkBlockModule} from './component/block/block';
import {RdkButtonModule} from './component/button/button';
import {RdkCheckBoxModule} from './component/checkbox/index';
import {RdkCollapseModule} from './component/collapse/collapse';
import {RdkComboSelectModule} from './component/combo-select/index';
import {RdkDialogModule} from './component/dialog/dialog';
import {RdkDraggableModule} from './component/draggable/draggable';
import {RdkGraphModule} from './component/graph/index';
import {RdkInputModule} from './component/input/input';
import {RdkLoadingModule} from './component/loading/loading';
import {RdkPaginationModule} from './component/pagination/pagination';
import {RdkRadioModule} from './component/radio/radio';
import {RdkRangeTimeModule} from './component/range-time/index';
import {RdkScrollBarModule} from './component/scrollbar/scrollbar';
import {RdkSelectModule} from './component/select/select';
import {RdkSliderModule} from './component/slider/index';
import {RdkSwitchModule} from './component/switch/index';
import {RdkTableModule, RdkTableRendererModule} from './component/table/table';
import {RdkTabsModule} from './component/tabs/index';
import {RdkTagModule} from './component/tag/tag';
import {RdkTileSelectModule} from './component/tile-select/tile-select';
import {RdkTimeModule} from './component/time/index';
import {RdkTooltipModule} from './component/tooltip/tooltip';
import {RdkTreeExtModule} from './component/tree/tree-ext';

const RDK_JIGSAW_MODULE = [
    RdkAlertModule,
    RdkBlockModule,
    RdkButtonModule,
    RdkCheckBoxModule,
    RdkCollapseModule,
    RdkComboSelectModule,
    RdkDialogModule,
    RdkDraggableModule,
    RdkGraphModule,
    RdkInputModule,
    RdkLoadingModule,
    RdkPaginationModule,
    RdkRadioModule,
    RdkRangeTimeModule,
    RdkScrollBarModule,
    RdkSelectModule,
    RdkSliderModule,
    RdkSwitchModule,
    RdkTableModule,
    RdkTableRendererModule,
    RdkTabsModule,
    RdkTagModule,
    RdkTileSelectModule,
    RdkTimeModule,
    RdkTooltipModule,
    RdkTreeExtModule
];

@NgModule({
    exports: RDK_JIGSAW_MODULE
})
export class RdkJigsawModule {
}

















