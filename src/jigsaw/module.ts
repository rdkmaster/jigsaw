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
import {JigsawLoadingModule} from './component/loading/loading';
import {JigsawPaginationModule} from './component/pagination/pagination';
import {JigsawRadioModule} from './component/radio/radio';
import {JigsawRangeTimeModule} from './component/range-time/index';
import {JigsawScrollbarModule} from './component/scrollbar/index';
import {JigsawSelectModule} from './component/select/select';
import {JigsawSliderModule} from './component/slider/index';
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
import {JigsawDraggableModule, JigsawDroppableModule} from './directive/dragdrop/index';
import {JigsawRootModule} from "./component/root/root";
import {JigsawFishBoneModule} from "./component/fish-bone/fish-bone";
import {JigsawViewportModule} from './component/viewport/viewport'
import {JigsawCommonModule} from "./component/common";
import {JigsawListModule} from "./component/list-and-tile/list";
import {JigsawTrustedHtmlModule} from "./directive/trusted-html/trusted-html";
import {JigsawBoxModule} from "./component/box/box";
import {JigsawViewEditorModule} from "./component/view-editor/view-editor";
import {JigsawResizableModule} from "./directive/resizable/resizable";
import {JigsawEditableBoxModule} from "./component/box/editable-box";

const JIGSAW_MODULE = [
    JigsawAlertModule,
    JigsawBlockModule,
    JigsawBoxModule,
    JigsawButtonModule,
    JigsawCheckBoxModule,
    JigsawCollapseModule,
    JigsawComboSelectModule,
    JigsawCommonModule,
    JigsawDialogModule,
    JigsawDraggableModule,
    JigsawDroppableModule,
    JigsawEditableBoxModule,
    JigsawFishBoneModule,
    JigsawGraphModule,
    JigsawInputModule,
    JigsawListModule,
    JigsawLoadingModule,
    JigsawMovableModule,
    JigsawPaginationModule,
    JigsawRadioModule,
    JigsawRangeTimeModule,
    JigsawResizableModule,
    JigsawRootModule,
    JigsawScrollbarModule,
    JigsawSelectModule,
    JigsawSliderModule,
    JigsawSwitchModule,
    JigsawTableModule,
    JigsawTableRendererModule,
    JigsawTabsModule,
    JigsawTagModule,
    JigsawTileSelectModule,
    JigsawTimeModule,
    JigsawTooltipModule,
    JigsawTreeExtModule,
    JigsawTrustedHtmlModule,
    JigsawViewEditorModule,
    JigsawViewportModule,
];

@NgModule({
    exports: JIGSAW_MODULE
})
export class JigsawModule {
}
