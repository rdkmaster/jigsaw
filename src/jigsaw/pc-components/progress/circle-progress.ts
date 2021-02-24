import {
    Component,
    NgModule,
    ChangeDetectionStrategy,
    Input
} from "@angular/core";
import { AbstractJigsawComponent } from "jigsaw/common/common";
import { CommonModule } from "@angular/common";

@Component({
    selector: "jigsaw-circle-progress, j-circle-progress",
    templateUrl: "circle-progress.html",
    host: {
        "[class.jigsaw-circle-progress-host]": "true",
        "[class.jigsaw-circle-progress-size-lg]": "size == 'large'",
        "[class.jigsaw-circle-progress-size-med]": "size == 'medium'",
        "[class.jigsaw-circle-progress-size-sm]": "size == 'small'"
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawCircleProgress extends AbstractJigsawComponent {
    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public data = 0;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public size: "small" | "medium" | "large" = "large";

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public showMarker: boolean = true;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public label: string = "";
}

@NgModule({
    imports: [CommonModule],
    declarations: [JigsawCircleProgress],
    exports: [JigsawCircleProgress]
})
export class JigsawCircleProgressModule {}
