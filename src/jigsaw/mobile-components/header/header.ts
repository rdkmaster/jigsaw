import {
    Component,
    NgModule,
    ChangeDetectionStrategy,
    Input
} from "@angular/core";
import { AbstractJigsawComponent } from "../../common/common";
import { CommonModule } from "@angular/common";

@Component({
    selector: "jigsaw-mobile-header,jm-header",
    templateUrl: "header.html",
    host: {
        "[class.jigsaw-header-host]": "true",
        "[class.jigsaw-header-level-1]": "level == 1",
        "[class.jigsaw-header-level-2]": "level == 2",
        "[class.jigsaw-header-level-3]": "level == 3"
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawMobileHeader extends AbstractJigsawComponent {
    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public level: 1 | 2 | 3 = 2;
}

@NgModule({
    imports: [CommonModule],
    declarations: [JigsawMobileHeader],
    exports: [JigsawMobileHeader]
})
export class JigsawMobileHeaderModule {}
