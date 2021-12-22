import {
    Component,
    NgModule,
    ChangeDetectionStrategy,
    Input,
    AfterViewInit
} from "@angular/core";
import { AbstractJigsawComponent } from "../../common/common";
import { CommonModule } from "@angular/common";
import { CommonUtils } from 'jigsaw/common/core/utils/common-utils';
import { TimeGr, TimeService, TimeWeekStart } from "../../common/service/time.service";

export type TimelineNode = {
    /**
     * 单个时间点的时间
     */
    time: Date | string;
    /**
     * 单个时间点的内容
     */
    context: string | string[];
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
export class JigsawTimeline extends AbstractJigsawComponent implements AfterViewInit {
    private _data: TimelineNode[];
    /**
     * 时间点的数据
     *
     * @NoMarkForCheckRequired
     *
     */
    @Input()
    public get data(): TimelineNode[] {
        return this._data;
    }

    public set data(value: TimelineNode[]) {
        this._data = value;
        this.update();
    };

    public update() {
        if (CommonUtils.isUndefined(this.data) || this.data.length === 0) {
            return;
        }

        this.data.forEach(node => {
            console.log(typeof node.context === 'string')
            if (typeof node.context === 'string') {
                node.context = new Array(<string>node.context)
            }
        })

        this.data.sort(function (a, b) {
            return TimeService.getFormatDate(a.time, TimeGr.second) > TimeService.getFormatDate(b.time, TimeGr.second) ? 1 : -1;
        })
        console.log(this.data)
    }

    ngAfterViewInit() {
        // this.update();
    }
}

@NgModule({
    imports: [CommonModule],
    declarations: [JigsawTimeline],
    exports: [JigsawTimeline]
})
export class JigsawTimelineModule { }
