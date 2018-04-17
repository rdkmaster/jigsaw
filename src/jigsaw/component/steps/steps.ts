import {AbstractJigsawComponent} from "../common"
import {Component, Input} from "@angular/core";

@Component({
    selector: 'jigsaw-steps, j-steps',
    template: '<div class="steps-container"><ng-content></ng-content></div>',
    host: {
        '[class.jigsaw-steps]': 'true',
        '[style.width]': 'width',
        '[style.height]': 'height',
        '[class.jigsaw-steps-size-small]': "preSize === 'small'",
        '[class.jigsaw-steps-size-large]': "preSize === 'large'",
        '[class.jigsaw-steps-direction-vertical]': "direction === 'vertical'",
        '[class.jigsaw-steps-direction-horizontal]': "direction === 'horizontal'",
    }
})
export class JigsawSteps extends AbstractJigsawComponent {
    @Input() public preSize: 'small' | 'default' | 'large' = "default";
    @Input() public direction: 'vertical' | 'horizontal' = "horizontal";
}
