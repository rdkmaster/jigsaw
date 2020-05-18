import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { JigsawAutoCompleteInputModule, JigsawMenuModule } from 'jigsaw/public_api';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {CascadingMenuDemo} from "./demo.component";

@NgModule({
    imports: [
        CommonModule, JigsawDemoDescriptionModule, JigsawMenuModule, JigsawAutoCompleteInputModule
    ],
    declarations: [CascadingMenuDemo],
    exports: [CascadingMenuDemo]
})
export class CascadingMenuModule {
}
