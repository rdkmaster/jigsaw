import { AbstractJigsawComponent, WingsTheme } from 'jigsaw/common/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@WingsTheme('alphabetical-index-select.scss')
@Component({
    selector: 'jigsaw-date-time-select, j-date-time-select',
    template: 'alphabetical-index-select.html',
    host: {
        '[style.width]': 'width',
        '[attr.data-theme]': 'theme',
        '[class.jigsaw-alphabetical-index-select-host]': 'true',
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawAlphabeticalIndexSelect extends AbstractJigsawComponent {

}