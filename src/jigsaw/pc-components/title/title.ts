import {
    Component,
    NgModule,
    ChangeDetectionStrategy,
    Input
} from "@angular/core";
import { AbstractJigsawComponent } from "jigsaw/common/common";
import { CommonModule } from "@angular/common";

@Component({
    selector: "jigsaw-title,j-title",
    templateUrl: "title.html",
    host: {
        "[class.jigsaw-title-host]": "true",
        "[class.jigsaw-title-level-1]": "level == 1",
        "[class.jigsaw-title-level-2]": "level == 2",
        "[class.jigsaw-title-level-3]": "level == 3"
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawTitle extends AbstractJigsawComponent {
    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public level: 1 | 2 | 3;
}

@NgModule({
    imports: [CommonModule],
    declarations: [JigsawTitle],
    exports: [JigsawTitle]
})
export class JigsawTitleModule {}
