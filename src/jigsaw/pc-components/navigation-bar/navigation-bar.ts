import {
    Component,
    Input,
    NgModule,
    ChangeDetectionStrategy,
    Output,
    EventEmitter
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { AbstractJigsawComponent, WingsTheme } from "../../common/common";

type PresetColor = 'preset-nav' | 'preset-blue' | 'preset-black';

@WingsTheme('navigation-bar.scss')
@Component({
    selector: 'jigsaw-navigation-bar, j-navigation-bar',
    templateUrl: './navigation-bar.html',
    host: {
        '[style.width]': 'width',
        '[style.height]': 'height',
        '[style.background]': '_$commonColor',
        '[attr.data-theme]': 'theme',
        '[class.jigsaw-navigation-bar-host]': 'true',
        '[class.jigsaw-navigation-bar-preset-nav]': 'background == "preset-nav"',
        '[class.jigsaw-navigation-bar-preset-blue]': 'background == "preset-blue"',
        '[class.jigsaw-navigation-bar-preset-black]': 'background == "preset-black"'
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawNavigationBar extends AbstractJigsawComponent {
    @Input()
    public logoSrc: string = '';

    @Input()
    public logoAlt: string = '';

    @Input()
    public buttonIcon: string = '';

    @Input()
    public title: string = '';

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public background: string | PresetColor = 'preset-nav';

    /**
     * 当使用普通原色时，需要在切换选中时，通过设置null值，清除之前的值
     * @internal
     */
    public get _$commonColor(): string {
        return this.background.startsWith("preset-") ? null : this.background;
    }

    @Output()
    public logoClick = new EventEmitter();

    @Output()
    public navButtonClick = new EventEmitter();

    @Output()
    public titleClick = new EventEmitter();
}

@NgModule({
    imports: [CommonModule],
    declarations: [JigsawNavigationBar],
    exports: [JigsawNavigationBar]
})
export class JigsawNavigationBarModule {

}
