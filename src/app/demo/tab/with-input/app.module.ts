import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import { JigsawButtonModule } from "jigsaw/component/button/button";
import { JigsawInputModule } from "jigsaw/component/input/input";
import { JigsawTabsModule } from "jigsaw/component/tabs/index";
import { JigsawTableModule } from "jigsaw/component/table/table";
import { JigsawTabsWithInputComponent }  from './app.component';
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
