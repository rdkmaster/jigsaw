import { Component } from "@angular/core";
import { TimelineNode } from 'jigsaw/pc-components/timeline/timeline';

@Component({
    templateUrl: "./demo.component.html",
    styleUrls: ["./demo.component.css"]
})
export class JigsawTimelineBasicDemoComponent {
    data: TimelineNode[] = [
        { time: '2021-12-19 13:40:30', context: "1" },
        { time: '2021-12-20 13:40:30', context: "123123123", title: "title" },
        { time: '2021-11-20 11:40:30', context: "123123123", title: "title" }
    ]
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "";
    description: string = "";
}
