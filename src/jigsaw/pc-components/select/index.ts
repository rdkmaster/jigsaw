import { JigsawComboSelectModule } from "../combo-select";
import { JigsawListLiteModule } from "../list-and-tile/list-lite";
import { NgModule } from "@angular/core";
import { JigsawSelect } from "./select";
import { JigsawCheckBoxModule } from "../checkbox";
import { JigsawListModule } from "../list-and-tile/list";
import { JigsawSelectGroup } from "./select-group";
import { JigsawCollapseModule } from "../collapse/collapse";
import { JigsawSelectCollapse } from "./select-collapse";

@NgModule({
    imports: [
        JigsawComboSelectModule,
        JigsawListLiteModule,
        JigsawListModule,
        JigsawCheckBoxModule,
        JigsawCollapseModule
    ],
    declarations: [JigsawSelect, JigsawSelectGroup, JigsawSelectCollapse],
    exports: [JigsawSelect, JigsawSelectGroup, JigsawSelectCollapse]
})
export class JigsawSelectModule {}
export * from "./select";
export * from "./select-collapse";
export * from "./select-group";
