import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JigsawDemoDescriptionModule } from "app/demo-description/demo-description";
import { JigsawHeaderModule } from "jigsaw/public_api";
import { JigsawTimelineBasicDemoComponent } from "./demo.component";
import { JigsawTimelineModule } from 'jigsaw/pc-components/timeline/timeline';

@NgModule({
    imports: [JigsawHeaderModule, CommonModule, JigsawDemoDescriptionModule, JigsawTimelineModule],
    declarations: [JigsawTimelineBasicDemoComponent],
    exports: [JigsawTimelineBasicDemoComponent]
})
export class JigsawTiemlineBasicDemoModule { }
