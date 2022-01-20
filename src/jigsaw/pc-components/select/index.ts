import { NgModule } from "@angular/core";
import { TranslateService, TranslateModule } from "@ngx-translate/core";
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { JigsawComboSelectModule } from "../combo-select/index";
import { JigsawSelect } from "./select";
import { JigsawCheckBoxModule } from "../checkbox/index";
import { JigsawListModule } from "../list-and-tile/list";
import { JigsawSelectGroup, JigsawSelectCollapse } from "./collapse-and-group-select";
import { JigsawCollapseModule } from "../collapse/collapse";
import { InternalUtils } from "../../common/core/utils/internal-utils";
import {JigsawInputModule} from "../input/input";
import { JigsawLoadingModule } from '../../common/components/loading/loading';

@NgModule({
    imports: [
        JigsawComboSelectModule,
        JigsawListModule,
        JigsawCheckBoxModule,
        JigsawCollapseModule,
        JigsawInputModule,
        PerfectScrollbarModule,
        JigsawLoadingModule,
        TranslateModule.forChild()
    ],
    declarations: [JigsawSelect, JigsawSelectGroup, JigsawSelectCollapse],
    exports: [JigsawSelect, JigsawSelectGroup, JigsawSelectCollapse]
})
export class JigsawSelectModule {
    constructor(translateService: TranslateService) {
        InternalUtils.initI18n(translateService, "select", {
            zh: {
                selectAll: "全选",
                checkSelected: "查看已选",
                checkAll: "查看全部",
                allSelected: "全部",
                selected: "已选择 {{ num }} 项",
                noData: "暂无数据",
                loading: "数据加载中...",
                groupNoData: "无数据"
            },
            en: {
                selectAll: "All",
                checkSelected: "Check Selected",
                checkAll: "Check All",
                allSelected: "All Selected",
                selected: "Selected {{ num }} item(s)",
                noData: "No Data",
                loading: "Loading...",
                groupNoData: "No Data"
            }
        });
        translateService.setDefaultLang(translateService.getBrowserLang());
    }
}
export * from "./select";
export * from "./collapse-and-group-select";
