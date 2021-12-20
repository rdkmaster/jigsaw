import {
    Component,
    NgModule,
    ChangeDetectionStrategy,
    Input
} from "@angular/core";
import { AbstractJigsawComponent } from "../../common/common";
import { CommonModule } from "@angular/common";

export type TimelineNode = {
    /**
     * 单个时间点的时间
     */
    time: Date;
    /**
     * 单个时间点的内容
     */
    context: string;
    /**
     * 单个时间点的状态
     */
    status?: "normal" | "success" | "warning" | "error";
    /**
     * 单个时间点的标题
     */
    title?: string;
    /**
     * 单个时间点的图标
     */
    icon?: string;
}

@Component({
    selector: "jigsaw-timeline,j-timeline",
    templateUrl: "timeline.html",
    host: {
        "[class.jigsaw-timeline-host]": "true"
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawTimeline extends AbstractJigsawComponent {
    /**
     * 时间点的数据
     *
     * @NoMarkForCheckRequired
     *
     */
    @Input()
    public data: TimelineNode[] = [{ time: new Date, context: "1" }, { time: new Date, context: "123123123", title: "title" }];
}

@NgModule({
    imports: [CommonModule],
    declarations: [JigsawTimeline],
    exports: [JigsawTimeline]
})
export class JigsawTimelineModule { }
