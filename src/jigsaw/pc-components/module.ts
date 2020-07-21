import {NgModule} from "@angular/core";

import {JigsawAlertModule} from './alert/alert';
import {JigsawBlockModule} from '../common/components/block/block';
import {JigsawButtonModule} from './button/button';
import {JigsawCheckBoxModule} from './checkbox/index';
import {JigsawCollapseModule} from './collapse/collapse';
import {JigsawComboSelectModule} from './combo-select/index';
import {JigsawDialogModule} from './dialog/dialog';
import {JigsawGraphModule} from './graph/index';
import {JigsawInputModule} from './input/input';
import {JigsawAutoCompleteInputModule} from './input/auto-complete-input';
import {JigsawLoadingModule} from '../common/components/loading/loading';
import {JigsawNotificationModule} from './notification/notification';
import {JigsawPaginationModule} from './pagination/pagination';
import {JigsawRadioModule} from './radio/radio';
import {JigsawScrollbarModule} from '../common/components/scrollbar/index';
import {JigsawSelectModule} from './select/select';
import {JigsawSliderModule} from './slider/index';
import {JigsawStepsModule} from './steps/index';
import {JigsawStepsMultilineModule} from "./steps/steps-multiline";
import {JigsawSwitchModule} from './switch/index';
import {JigsawTableModule} from './table/table';
import {JigsawTableRendererModule} from "./table/table-renderer";
import {JigsawTabsModule} from './tabs/index';
import {JigsawTagModule} from './tag/tag';
import {JigsawTileSelectModule} from './list-and-tile/tile';
import {JigsawTooltipModule} from './tooltip/tooltip';
import {JigsawTreeExtModule} from './tree/tree-ext';
import {JigsawMovableModule} from "../common/directive/movable/index";
import {JigsawFloatModule} from "../common/directive/float/index";
import {JigsawDraggableModule, JigsawDroppableModule} from '../common/directive/dragdrop/index';
import {JigsawRootModule} from "./root/root";
import {JigsawFishBoneModule} from "./fish-bone/fish-bone";
import {JigsawViewportModule} from './viewport/viewport'
import {JigsawCommonModule} from "../common/common";
import {JigsawListModule} from "./list-and-tile/list";
import {JigsawTrustedHtmlModule} from "../common/directive/trusted-html/trusted-html";
import {JigsawBoxModule} from "./box/index";
import {JigsawDrawerModule} from "./drawer/drawer";
import {JigsawCascadeModule} from "./cascade/cascade";
import {JigsawNumericInputModule} from "./input/numeric-input";
import {JigsawListLiteModule} from "./list-and-tile/list-lite";
import {JigsawTileLiteModule} from "./list-and-tile/tile-lite";
import {JigsawRadioLiteModule} from "./radio/radio-lite";
import {JigsawButtonBarModule} from "./list-and-tile/button-bar";
import {JigsawIconModule} from "./icon/icon";
import {JigsawUploadModule} from "./upload/index";
import {JigsawTransferModule} from "./transfer/transfer";
import {JigsawTextareaModule} from "./textarea/index";
import {JigsawBreadcrumbModule} from "./breadcrumb/breadcrumb";
import {JigsawRateModule} from "./rate/index";
import {JigsawMenuModule} from "./menu/index";
import {JigsawProgressModule} from "./progress/progress";
import {JigsawDatePickerModule} from "./date-and-time/date-picker";
import {JigsawTimePickerModule} from "./date-and-time/time-picker";
import {JigsawDateTimePickerModule} from "./date-and-time/date-time-picker";
import {JigsawRangeDateTimePickerModule} from "./date-and-time/range-date-time-picker";
import {JigsawDateTimeSelectModule} from "./date-and-time/date-time-select";
import {JigsawRangeDateTimeSelectModule} from "./date-and-time/range-date-time-select";
import {JigsawColorSelectModule} from "./color-select/index";

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
    JigsawRootModule,
    JigsawScrollbarModule,
    JigsawSelectModule,
    JigsawSliderModule,
    JigsawStepsModule,
    JigsawSwitchModule,
    JigsawTableModule,
    JigsawTableRendererModule,
    JigsawTabsModule,
    JigsawTagModule,
    JigsawTileSelectModule,
    JigsawTileLiteModule,
    JigsawTooltipModule,
    JigsawTreeExtModule,
    JigsawTrustedHtmlModule,
    JigsawViewportModule,
    JigsawIconModule,
    JigsawUploadModule,
    JigsawTransferModule,
    JigsawTextareaModule,
    JigsawBreadcrumbModule,
    JigsawRateModule,
    JigsawStepsMultilineModule,
    JigsawMenuModule,
    JigsawProgressModule,
    JigsawDatePickerModule,
    JigsawTimePickerModule,
    JigsawDateTimePickerModule,
    JigsawRangeDateTimePickerModule,
    JigsawDateTimeSelectModule,
    JigsawRangeDateTimeSelectModule,
    JigsawColorSelectModule
];

@NgModule({
    exports: JIGSAW_MODULE
})
export class JigsawModule {
}
