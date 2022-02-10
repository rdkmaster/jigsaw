import {
    Component,
    NgModule,
    ChangeDetectionStrategy,
    Input
} from "@angular/core";
import {AbstractJigsawComponent, WingsTheme} from "../../common/common";
import { CommonModule } from "@angular/common";

@WingsTheme('header.scss')
@Component({
    selector: "jigsaw-header,j-header",
    templateUrl: "header.html",
    host: {
        "[attr.data-theme]": "theme",
        "[class.jigsaw-header-host]": "true",
        "[class.jigsaw-header-level-1]": "level == 1",
        "[class.jigsaw-header-level-2]": "level == 2",
        "[class.jigsaw-header-level-3]": "level == 3"
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawHeader extends AbstractJigsawComponent {
    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public level: 1 | 2 | 3 = 2;
}

@NgModule({
    imports: [CommonModule],
    declarations: [JigsawHeader],
    exports: [JigsawHeader]
})
export class JigsawHeaderModule {}
