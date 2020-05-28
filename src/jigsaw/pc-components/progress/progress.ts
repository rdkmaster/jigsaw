import {ChangeDetectionStrategy, Component, NgModule, Input} from '@angular/core';
import {AbstractJigsawComponent} from "../../common/common";
import {CommonModule} from '@angular/common';

@Component({
    selector: 'jigsaw-progress, j-progress',
    templateUrl: './progress.html',
    host: {
        '[class.jigsaw-progress]': 'true',
        '[class.jigsaw-progress-primary]': 'colorType == "primary"',
        '[class.jigsaw-progress-warning]': 'colorType == "warning"',
        '[class.jigsaw-progress-error]': 'colorType == "error" || colorType == "danger"',
        '[class.jigsaw-progress-default]': 'preSize == "default"',
        '[class.jigsaw-progress-small]': 'preSize == "small"',
        '[class.jigsaw-progress-large]': 'preSize == "large"',
        '[style.width]': 'width',
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawProgress extends AbstractJigsawComponent {

    @Input()
    public value: string;

    @Input()
    public split: boolean;

    @Input()
    public labelPosition: 'left' | 'right' | 'top' |'followLeft' | 'followRight' = 'right';

    @Input() public colorType: 'primary' | 'warning' | 'error' | 'danger' = 'primary';

    @Input() public preSize: 'default' | 'small' | 'large' = 'default';

}

@NgModule({
    imports: [CommonModule],
    declarations: [JigsawProgress],
    exports: [JigsawProgress]
})
export class JigsawProgressModule {

}
