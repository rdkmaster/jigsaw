import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import { TranslateModule } from '@ngx-translate/core';
import {JigsawListModule} from "../list-and-tile/list";
import {JigsawMenu, JigsawMenuHelper} from "./menu";
import {JigsawNavigationMenu} from "./navigation-menu";
import {JigsawCascadingMenu} from "../../common/directive/menu/cascading-menu";
import { JigsawTooltipModule } from '../../common/directive/tooltip/tooltip';
import { JigsawBadgeModule } from '../../common/directive/badge/index';
import {TranslateHelper} from "../../common/core/utils/translate-helper";

@NgModule({
    declarations: [JigsawMenu, JigsawCascadingMenu, JigsawMenuHelper, JigsawNavigationMenu],
    exports: [JigsawMenu, JigsawCascadingMenu, JigsawNavigationMenu],
    imports: [JigsawListModule, CommonModule, PerfectScrollbarModule, JigsawTooltipModule, JigsawBadgeModule, TranslateModule.forChild()]
})
export class JigsawMenuModule {
    constructor() {
        TranslateHelper.initI18n('navigation', {
            zh: {
                hide: "收起"
            },
            en: {
                hide: "Dismiss"
            }
        });
    }
}

export * from "../../common/directive/menu/cascading-menu";
export * from "./menu";
export * from "./navigation-menu";
