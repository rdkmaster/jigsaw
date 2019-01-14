import {NgModule} from "@angular/core";

import {JigsawAlertModule} from './component/alert/alert';
import {JigsawBlockModule} from './component/block/block';
import {JigsawButtonModule} from './component/button/button';
import {JigsawCheckBoxModule} from './component/checkbox/index';
import {JigsawCollapseModule} from './component/collapse/collapse';
import {JigsawComboSelectModule} from './component/combo-select/index';
import {JigsawDialogModule} from './component/dialog/dialog';
import {JigsawGraphModule} from './component/graph/index';
import {JigsawInputModule} from './component/input/input';
import {JigsawAutoCompleteInputModule} from './component/input/auto-complete-input';
import {JigsawLoadingModule} from './component/loading/loading';
import {JigsawNotificationModule} from './component/notification/notification';
import {JigsawPaginationModule} from './component/pagination/pagination';
import {JigsawRadioModule} from './component/radio/radio';
import {JigsawRangeTimeModule} from './component/range-time/index';
import {JigsawScrollbarModule} from './component/scrollbar/index';
import {JigsawSelectModule} from './component/select/select';
import {JigsawSliderModule} from './component/slider/index';
import {JigsawStepsModule} from './component/steps/index';
import {JigsawSwitchModule} from './component/switch/index';
import {JigsawTableModule} from './component/table/table';
import {JigsawTableRendererModule} from "./component/table/table-renderer";
import {JigsawTabsModule} from './component/tabs/index';
import {JigsawTagModule} from './component/tag/tag';
import {JigsawTileSelectModule} from './component/list-and-tile/tile';
import {JigsawTimeModule} from './component/time/index';
import {JigsawTooltipModule} from './component/tooltip/tooltip';
import {JigsawTreeExtModule} from './component/tree/tree-ext';
import {JigsawMovableModule} from "./directive/movable/index";
import {JigsawFloatModule} from "./directive/float/index";
import {JigsawDraggableModule, JigsawDroppableModule} from './directive/dragdrop/index';
import {JigsawRootModule} from "./component/root/root";
import {JigsawFishBoneModule} from "./component/fish-bone/fish-bone";
import {JigsawViewportModule} from './component/viewport/viewport'
import {JigsawCommonModule} from "./component/common";
import {JigsawListModule} from "./component/list-and-tile/list";
import {JigsawTrustedHtmlModule} from "./directive/trusted-html/trusted-html";
import {JigsawBoxModule} from "./component/box/index";
import {JigsawTabsWrapperModule} from "./component/box/tabs-wrapper/tabs-wrapper";
import {JigsawDrawerModule} from "./component/drawer/drawer";
import {JigsawCascadeModule} from "./component/cascade/cascade";
import {JigsawNumericInputModule} from "./component/input/numeric-input";
import {JigsawListLiteModule} from "./component/list-and-tile/list-lite";
import {JigsawTileLiteModule} from "./component/list-and-tile/tile-lite";
import {JigsawRadioLiteModule} from "./component/radio/radio-lite";
import {JigsawButtonBarModule} from "./component/list-and-tile/button-bar";
import {JigsawIconModule} from "./component/icon/icon";
import {JigsawUploadModule} from "./component/upload/index";
import {JigsawTransferModule} from "./component/transfer/transfer";
import {JigsawTextareaModule} from "./component/textarea/index";
import {JigsawBreadcrumbModule} from "./component/breadcrumb/breadcrumb";
import {JigsawRateModule} from "./component/rate/index";

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
