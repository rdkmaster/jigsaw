import { NgModule } from '@angular/core';
import { JigsawTabsModule } from "jigsaw/component/tabs/index";
import { JigsawButtonModule } from "jigsaw/component/button/button";
import { JigsawInputModule } from "jigsaw/component/input/input";
import { JigsawTabsDemoComponent }  from './app.component';
import {JigsawTableModule} from "jigsaw/component/table/table";

@NgModule({
    imports: [ JigsawTabsModule, JigsawButtonModule, JigsawInputModule, JigsawTableModule ],
    declarations: [ JigsawTabsDemoComponent ],
    bootstrap: [ JigsawTabsDemoComponent ]
})
export class TabsBasicDemoModule {}
