import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { JigsawMenuModule, JigsawButtonBarModule, JigsawNumericInputModule } from 'jigsaw/public_api';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {CascadingMenuDemo} from "./demo.component";

@NgModule({
    imports: [
        CommonModule, JigsawDemoDescriptionModule, JigsawMenuModule, JigsawButtonBarModule,
        JigsawNumericInputModule
    ],
    declarations: [CascadingMenuDemo],
    exports: [CascadingMenuDemo]
})
export class CascadingMenuModule {
}
