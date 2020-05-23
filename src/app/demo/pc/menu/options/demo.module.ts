import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { JigsawMenuModule, JigsawButtonBarModule, JigsawNumericInputModule } from 'jigsaw/public_api';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {CascadingMenuOptionsDemo} from "./demo.component";

@NgModule({
    imports: [
        CommonModule, JigsawDemoDescriptionModule, JigsawMenuModule, JigsawButtonBarModule,
        JigsawNumericInputModule
    ],
    declarations: [CascadingMenuOptionsDemo],
    exports: [CascadingMenuOptionsDemo]
})
export class CascadingMenuOptionsModule {
}
