import { NgModule } from "@angular/core";
import {CascadeAllComponent} from "./demo.component";
import {JigsawMarkdownModule} from "../../markdown/markdown";
import {DemoTemplateModule} from "../../demo-template/demo-template";
import {CommonModule} from "@angular/common";
import {CascadeBasicComponent} from "./basic/demo.component";
import {CascadeLazyLoadComponent} from "./lazy-load/demo.component";
import {CascadeSelectedItemsComponent} from "./selected-items/demo.component";
import {CascadeMultipleComponent} from "./multiple-select/demo.component";
import {CascadeTrackComponent} from "./track-item-by/demo.component";
import {CascadeShowAllComponent} from "./show-all/demo.component";
import {CascadeWithComboComponent} from "./with-combo/demo.component";
import {CascadeSearchAndPagingComponent} from "./search-and-paging/demo.component";
import {JigsawCascadeModule, JigsawComboSelectModule} from "jigsaw/public_api";

@NgModule({
    imports: [
        JigsawMarkdownModule,
        DemoTemplateModule,
        CommonModule,
        JigsawCascadeModule,
        JigsawComboSelectModule
    ],
    declarations: [
        CascadeAllComponent,
        CascadeBasicComponent,
        CascadeLazyLoadComponent,
        CascadeSelectedItemsComponent,
        CascadeMultipleComponent,
        CascadeTrackComponent,
        CascadeShowAllComponent,
        CascadeWithComboComponent,
        CascadeSearchAndPagingComponent
    ]
})
export class CascadeAllModule {}
