import { NgModule } from '@angular/core';
import { JigsawButtonModule } from "jigsaw/component/button/button";
import { JigsawInputModule } from "jigsaw/component/input/input";
import { JigsawTabsModule } from "jigsaw/component/tabs/index";
import { JigsawTableModule } from "jigsaw/component/table/table";
import { JigsawTabsWithInputComponent }  from './app.component';
import {CommonModule} from "@angular/common";

@NgModule({
    imports: [
        JigsawTabsModule, JigsawInputModule, JigsawButtonModule, JigsawTableModule, CommonModule
    ],
    declarations: [ JigsawTabsWithInputComponent ],
    bootstrap: [ JigsawTabsWithInputComponent ]
})
export class TabsWithInputDemoModule {}
