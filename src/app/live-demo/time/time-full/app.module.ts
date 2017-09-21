import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { JigsawTimeModule } from "jigsaw/component/time/index";
import { TimeFullComponent }  from './app.component';
import {JigsawRadioModule} from "jigsaw/component/radio/radio";

@NgModule({
    imports: [ CommonModule, JigsawTimeModule, JigsawRadioModule ],
    declarations: [ TimeFullComponent ],
    bootstrap: [ TimeFullComponent ]
})
export class TimeFullModule {}
