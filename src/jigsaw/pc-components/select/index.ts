import { NgModule } from "@angular/core";
import { TranslateService, TranslateModule } from "@ngx-translate/core";
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { JigsawComboSelectModule } from "../combo-select/index";
import { JigsawSelect } from "./select";
import { JigsawCheckBoxModule } from "../checkbox/index";
import { JigsawListModule } from "../list-and-tile/list";
import { JigsawSelectGroup, JigsawSelectCollapse } from "./select-group";
import { JigsawCollapseModule } from "../collapse/collapse";
import { InternalUtils } from "../../common/core/utils/internal-utils";
import {JigsawInputModule} from "../input/input";

@NgModule({
    imports: [
        JigsawComboSelectModule,
        JigsawListModule,
        JigsawCheckBoxModule,
        JigsawCollapseModule,
        JigsawInputModule,
        PerfectScrollbarModule,
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
                return: "返回",
                allSelected: "全部",
                selected: "已选择 {{ num }} 项"
            },
            en: {
                selectAll: "All",
                checkSelected: "Check Selected",
                return: "All",
                allSelected: "All Selected",
                selected: "You have selected {{ num }} item(s)"
            }
        });
        translateService.setDefaultLang(translateService.getBrowserLang());
    }
}
export * from "./select";
export * from "./select-group";
