import {NgModule} from "@angular/core";

import {JigsawAlertModule} from './pc-components/alert/alert';
import {JigsawBlockModule} from './pc-components/block/block';
import {JigsawButtonModule} from './pc-components/button/button';
import {JigsawCheckBoxModule} from './pc-components/checkbox/index';
import {JigsawCollapseModule} from './pc-components/collapse/collapse';
import {JigsawComboSelectModule} from './pc-components/combo-select/index';
import {JigsawDialogModule} from './pc-components/dialog/dialog';
import {JigsawGraphModule} from './pc-components/graph/index';
import {JigsawInputModule} from './pc-components/input/input';
import {JigsawAutoCompleteInputModule} from './pc-components/input/auto-complete-input';
import {JigsawLoadingModule} from './pc-components/loading/loading';
import {JigsawNotificationModule} from './pc-components/notification/notification';
import {JigsawPaginationModule} from './pc-components/pagination/pagination';
import {JigsawRadioModule} from './pc-components/radio/radio';
import {JigsawRangeTimeModule} from './pc-components/range-time/index';
import {JigsawScrollbarModule} from './pc-components/scrollbar/index';
import {JigsawSelectModule} from './pc-components/select/select';
import {JigsawSliderModule} from './pc-components/slider/index';
import {JigsawStepsModule} from './pc-components/steps/index';
import {JigsawSwitchModule} from './pc-components/switch/index';
import {JigsawTableModule} from './pc-components/table/table';
import {JigsawTableRendererModule} from "./pc-components/table/table-renderer";
import {JigsawTabsModule} from './pc-components/tabs/index';
import {JigsawTagModule} from './pc-components/tag/tag';
import {JigsawTileSelectModule} from './pc-components/list-and-tile/tile';
import {JigsawTimeModule} from './pc-components/time/index';
import {JigsawTooltipModule} from './pc-components/tooltip/tooltip';
import {JigsawTreeExtModule} from './pc-components/tree/tree-ext';
import {JigsawMovableModule} from "./common/directive/movable/index";
import {JigsawFloatModule} from "./common/directive/float/index";
import {JigsawDraggableModule, JigsawDroppableModule} from './common/directive/dragdrop/index';
import {JigsawRootModule} from "./pc-components/root/root";
import {JigsawFishBoneModule} from "./pc-components/fish-bone/fish-bone";
import {JigsawViewportModule} from './pc-components/viewport/viewport'
import {JigsawCommonModule} from "./pc-components/common";
import {JigsawListModule} from "./pc-components/list-and-tile/list";
import {JigsawTrustedHtmlModule} from "./common/directive/trusted-html/trusted-html";
import {JigsawBoxModule} from "./pc-components/box/index";
import {JigsawTabsWrapperModule} from "./pc-components/box/tabs-wrapper/tabs-wrapper";
import {JigsawDrawerModule} from "./pc-components/drawer/drawer";
import {JigsawCascadeModule} from "./pc-components/cascade/cascade";
import {JigsawNumericInputModule} from "./pc-components/input/numeric-input";
import {JigsawListLiteModule} from "./pc-components/list-and-tile/list-lite";
import {JigsawTileLiteModule} from "./pc-components/list-and-tile/tile-lite";
import {JigsawRadioLiteModule} from "./pc-components/radio/radio-lite";
import {JigsawButtonBarModule} from "./pc-components/list-and-tile/button-bar";
import {JigsawIconModule} from "./pc-components/icon/icon";
import {JigsawUploadModule} from "./pc-components/upload/index";
import {JigsawTransferModule} from "./pc-components/transfer/transfer";
import {JigsawTextareaModule} from "./pc-components/textarea/index";
import {JigsawBreadcrumbModule} from "./pc-components/breadcrumb/breadcrumb";
import {JigsawRateModule} from "./pc-components/rate/index";

const JIGSAW_MODULE = [
    JigsawAlertModule,
    JigsawBlockModule,
    JigsawBoxModule,
    JigsawButtonModule,
    JigsawButtonBarModule,
    JigsawCascadeModule,
    JigsawCheckBoxModule,
    JigsawCollapseModule,
    JigsawComboSelectModule,
    JigsawCommonModule,
    JigsawDialogModule,
    JigsawDraggableModule,
    JigsawDroppableModule,
    JigsawDrawerModule,
    JigsawFishBoneModule,
    JigsawGraphModule,
    JigsawInputModule,
    JigsawAutoCompleteInputModule,
    JigsawNumericInputModule,
    JigsawListModule,
    JigsawListLiteModule,
    JigsawLoadingModule,
    JigsawMovableModule,
    JigsawFloatModule,
    JigsawNotificationModule,
    JigsawPaginationModule,
    JigsawRadioModule,
    JigsawRadioLiteModule,
    JigsawRangeTimeModule,
    JigsawRootModule,
    JigsawScrollbarModule,
    JigsawSelectModule,
    JigsawSliderModule,
    JigsawStepsModule,
    JigsawSwitchModule,
    JigsawTableModule,
    JigsawTableRendererModule,
    JigsawTabsModule,
    JigsawTabsWrapperModule,
    JigsawTagModule,
    JigsawTileSelectModule,
    JigsawTileLiteModule,
    JigsawTimeModule,
    JigsawTooltipModule,
    JigsawTreeExtModule,
    JigsawTrustedHtmlModule,
    JigsawViewportModule,
    JigsawIconModule,
    JigsawUploadModule,
    JigsawTransferModule,
    JigsawTextareaModule,
    JigsawBreadcrumbModule,
    JigsawRateModule
];

@NgModule({
    exports: JIGSAW_MODULE
})
export class JigsawModule {
}
