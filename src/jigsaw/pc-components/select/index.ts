import { JigsawComboSelectModule } from "../combo-select";
import { JigsawListLiteModule } from "../list-and-tile/list-lite";
import { NgModule } from "@angular/core";
import { JigsawSelect } from "./select";
import { JigsawCheckBoxModule } from "../checkbox";
import { JigsawSelectCheckbox } from "./select-checkbox";
import { JigsawListModule } from "../list-and-tile/list";
import { JigsawSelectGroup } from "./select-group";
import { JigsawCollapseModule } from "../collapse/collapse";

@NgModule({
    imports: [
        JigsawComboSelectModule,
        JigsawListLiteModule,
        JigsawListModule,
        JigsawCheckBoxModule,
        JigsawCollapseModule
    ],
    declarations: [JigsawSelect, JigsawSelectCheckbox, JigsawSelectGroup],
    exports: [JigsawSelect, JigsawSelectCheckbox, JigsawSelectGroup]
})
export class JigsawSelectModule {}
export * from "./select";
export * from "./select-checkbox";
export * from "./select-group";
