import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawButtonModule, JigsawInputModule, JigsawTabsModule, JigsawTableModule} from "jigsaw/public_api";
import { JigsawTabsWithInputComponent }  from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [
        CommonModule, JigsawTabsModule, JigsawInputModule, JigsawButtonModule, JigsawTableModule,
        JigsawDemoDescriptionModule
    ],
    declarations: [ JigsawTabsWithInputComponent ],
    exports: [ JigsawTabsWithInputComponent ]
})
export class TabsWithInputDemoModule {}
