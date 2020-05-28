import {ChangeDetectionStrategy, Component, NgModule, Input} from '@angular/core';
import {AbstractJigsawComponent} from "../../common/common";
import {CommonModule} from '@angular/common';

@Component({
    selector: 'jigsaw-progress, j-progress',
    templateUrl: './progress.html',
    host: {
        '[class.jigsaw-progress]': 'true',
        '[class.jigsaw-progress-processing]': 'status == "processing"',
        '[class.jigsaw-progress-block]': 'status == "block"',
        '[class.jigsaw-progress-error]': 'status == "error"',
        '[class.jigsaw-progress-success]': 'status == "success"',
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

    @Input() public status: 'processing' | 'block' | 'error' | 'success' = 'processing';

    @Input() public preSize: 'default' | 'small' | 'large' = 'default';

}

@NgModule({
    imports: [CommonModule],
    declarations: [JigsawProgress],
    exports: [JigsawProgress]
})
export class JigsawProgressModule {

}
