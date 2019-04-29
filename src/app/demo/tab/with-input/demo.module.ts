import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import { JigsawButtonModule } from "jigsaw/pc-components/button/button";
import { JigsawInputModule } from "jigsaw/pc-components/input/input";
import { JigsawTabsModule } from "jigsaw/pc-components/tabs/index";
import { JigsawTableModule } from "jigsaw/pc-components/table/table";
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
