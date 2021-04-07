import { JigsawComboSelectModule } from "../combo-select";
import { JigsawListLiteModule } from "../list-and-tile/list-lite";
import { NgModule } from "@angular/core";
import { JigsawSelect } from "./select";
import { JigsawCheckBoxModule } from "../checkbox";
import { JigsawSelectCheckbox } from "./select-checkbox";
import { JigsawListModule } from '../list-and-tile/list';

@NgModule({
    imports: [
        JigsawComboSelectModule,
        JigsawListLiteModule,
        JigsawListModule,
        JigsawCheckBoxModule
    ],
    declarations: [JigsawSelect, JigsawSelectCheckbox],
    exports: [JigsawSelect, JigsawSelectCheckbox]
})
export class JigsawSelectModule {}
export * from "./select";
export * from "./select-checkbox";
