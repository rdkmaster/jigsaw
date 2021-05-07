import { JigsawComboSelectModule } from "../combo-select";
import { JigsawListLiteModule } from "../list-and-tile/list-lite";
import { NgModule } from "@angular/core";
import { JigsawSelect } from "./select";
import { JigsawCheckBoxModule } from "../checkbox";
import { JigsawListModule } from "../list-and-tile/list";
import { JigsawSelectGroup, JigsawSelectCollapse } from "./select-group";
import { JigsawCollapseModule } from "../collapse/collapse";
import { TranslateService, TranslateModule } from "@ngx-translate/core";
import { InternalUtils } from "jigsaw/common/core/utils/internal-utils";
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

@NgModule({
    imports: [
        JigsawComboSelectModule,
        JigsawListLiteModule,
        JigsawListModule,
        JigsawCheckBoxModule,
        JigsawCollapseModule,
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
                selected: "已选择",
                itemUnit: "项"
            },
            en: {
                selectAll: "All",
                checkSelected: "Check Selected",
                return: "All",
                allSelected: "All Selected",
                selected: "You have selected",
                itemUnit: "items"
            }
        });
        translateService.setDefaultLang(translateService.getBrowserLang());
    }
}
export * from "./select";
export * from "./select-group";
