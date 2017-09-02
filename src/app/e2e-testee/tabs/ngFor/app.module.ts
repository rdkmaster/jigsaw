import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { JigsawTabsModule } from "jigsaw/component/tabs/index";
import { JigsawTabsWithNgForComponent }  from './app.component';

@NgModule({
    imports: [ CommonModule, JigsawTabsModule ],
    declarations: [ JigsawTabsWithNgForComponent ],
    bootstrap: [ JigsawTabsWithNgForComponent ]
})
export class TabsWithNgForDemoModule {}
