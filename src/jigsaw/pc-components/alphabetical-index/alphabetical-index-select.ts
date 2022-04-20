import { AbstractJigsawComponent, WingsTheme } from 'jigsaw/common/common';
import { ChangeDetectionStrategy, Component, NgModule, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JigsawAlphabeticalIndexModule, alphabeticalIndexData } from './alphabetical-index';
import { CommonUtils } from 'jigsaw/common/core/utils/common-utils';
import { RequireMarkForCheck } from 'jigsaw/common/decorator/mark-for-check';
import { JigsawSelectBase } from '../select/select-base';
import { ArrayCollection } from 'jigsaw/common/core/data/array-collection';
import { SelectOption } from '../../../../dist/@rdkmaster/jigsaw/pc-components/select/select-base';

@WingsTheme('alphabetical-index-select.scss')
@Component({
    selector: 'jigsaw-alphabetical-index-select, j-alphabetical-index-select',
    template: 'alphabetical-index-select.html',
    host: {
        '[style.width]': 'width',
        '[attr.data-theme]': 'theme',
        '[class.jigsaw-alphabetical-index-select-host]': 'true',
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawAlphabeticalIndexSelect extends JigsawSelectBase {
    // protected _data: ArrayCollection<string>;
    // /**
    //  * 提供选择的数据集合
    //  *
    //  * @NoMarkForCheckRequired
    //  */
    // @Input()
    // public get data(): ArrayCollection<SelectOption> {
    //     return this._data;
    // }

    public set data(value: ArrayCollection<SelectOption>) {

    }
}

@NgModule({
    imports: [CommonModule, JigsawAlphabeticalIndexModule],
    declarations: [JigsawAlphabeticalIndexSelect],
    exports: [JigsawAlphabeticalIndexSelect]
})
export class JigsawAlphabeticalIndexSelectModule { }