import {
    Component,
    NgModule,
    ChangeDetectionStrategy,
    Input,
    ViewChildren,
    ElementRef,
    QueryList,
    ViewChild,
    AfterViewInit,
    Output,
    EventEmitter,
    NgZone,
    Injector,
    ChangeDetectorRef
} from "@angular/core";
import { AbstractJigsawComponent, WingsTheme } from "../../common/common";
import { CommonModule } from "@angular/common";
import { ArrayCollection } from '../../common/core/data/array-collection';
import { JigsawListModule } from '../list-and-tile/list';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { CommonUtils, CallbackRemoval } from '../../common/core/utils/common-utils';
import { RequireMarkForCheck } from '../../common/decorator/mark-for-check';

export type PinyinDictionary = {
    [key: string]: string;
}

@WingsTheme('alphabetical-index.scss')
@Component({
    selector: "jigsaw-alphabetical-index, j-alphabetical-index",
    templateUrl: "alphabetical-index.html",
    host: {
        '[style.width]': 'width',
        "[attr.data-theme]": "theme",
        "[class.jigsaw-alphabetical-index-host]": "true",
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawAlphabeticalIndex extends AbstractJigsawComponent implements AfterViewInit {
    public constructor(protected _changeDetector: ChangeDetectorRef, protected _injector: Injector, protected _zone?: NgZone) {
        super(_zone);
    }

    private _data: ArrayCollection<string>;
    private _removeOnRefresh: CallbackRemoval;

    /**
     * 组件数据
     * 
     * @NoMarkForCheckRequired
     */
    @Input()
    public get data(): ArrayCollection<string> {
        return this._data;
    }

    public set data(value: ArrayCollection<string>) {
        if (!CommonUtils.isDefined(value)) {
            this._data = new ArrayCollection([]);
        }
        this._data = value instanceof ArrayCollection ? value : new ArrayCollection(value);

        if (this._removeOnRefresh) {
            this._removeOnRefresh();
        }
        this._removeOnRefresh = this._data.onRefresh(() => {
            this._sortDataAndJump();
        })
        this._sortDataAndJump();
    }

    private _pinyinDictionary: PinyinDictionary;

    /**
     * 拼字字典配置
     * 
     * @NoMarkForCheckRequired
     */
    @Input()
    public get pinyinDictionary(): PinyinDictionary {
        return this._pinyinDictionary;
    }

    public set pinyinDictionary(value: PinyinDictionary) {
        if (!value || this._pinyinDictionary == value) {
            this._pinyinDictionary = {};
            return;
        }
        this._pinyinDictionary = value;

        if (this._removeOnRefresh) {
            this._removeOnRefresh();
        }
        this._removeOnRefresh = this._data.onRefresh(() => {
            this._sortDataAndJump();
        })
        this._sortDataAndJump();
    }

    private _sortDataAndJump(): void {
        this._$sortedData = this._sortByFirstLetter(this._data);
        this.runAfterMicrotasks(() => {
            this._$jumpTo(0);
        })
    }

    private _value: ArrayCollection<string>;

    /**
     * 选择的结果，数组形式
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public get value(): ArrayCollection<string> {
        return this._value;
    }

    public set value(newValue: ArrayCollection<string>) {
        if (CommonUtils.compareValue(this._value, newValue)) {
            return;
        }
        this._value = newValue;
    }

    @Output()
    public valueChange = new EventEmitter<ArrayCollection<string>>();

    /**
     * @internal 
     */
    @RequireMarkForCheck()
    public _$sortedData: ArrayCollection<string>;

    /**
     * @internal 
     */
    public _$alphabeticalIndex = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '#'];

    /**
     * @internal 
     */
    private _enLetters = ['#', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'W', 'X', 'Y', 'Z'];
    private _zhLetters = ['阿', '八', '嚓', '哒', '妸', '发', '旮', '哈', '讥', '咔', '垃', '痳', '拏', '噢', '妑', '七', '呥', '扨', '它', '穵', '夕', '丫', '帀'];

    @ViewChildren('indexTitle', { read: ElementRef })
    private _titleElementRefs: QueryList<ElementRef>;

    @ViewChild('dataList', { read: ElementRef })
    private _dataElementRefs: ElementRef;

    @ViewChild('indexList', { read: ElementRef })
    private _indexElementRefs: ElementRef;

    @ViewChildren('indexListItem', { read: ElementRef })
    private _indexItemElementRefs: QueryList<ElementRef>;

    private _sortByFirstLetter(arr: ArrayCollection<string>): ArrayCollection<string> {
        if (!String.prototype.localeCompare) {
            return null;
        }

        const letterGroup = {}
        const result = new ArrayCollection([]);
        this._$alphabeticalIndex.forEach(letter => {
            letterGroup[letter] = [];
        })

        arr.forEach(item => {
            if (CommonUtils.isUndefined(item)) {
                return;
            }
            item += '';
            const word = item.trim().toUpperCase();
            if (/^[A-Z#]/.test(word)) {
                const firstLetter = word.substr(0, 1);
                letterGroup[firstLetter].push(item);
                return;
            }

            if (this.pinyinDictionary) {
                const res = this.pinyinDictionary[item];
                if (/^[A-Z#]/.test(res)) {
                    const firstLetter = res.substr(0, 1);
                    letterGroup[firstLetter].push(item);
                } else {
                    letterGroup['#'].push(item);
                }
            } else {
                this._enLetters.forEach((letter, i) => {
                    if ((!this._zhLetters[i - 1] || this._zhLetters[i - 1].localeCompare(word, 'zh-CN') <= 0) && word.localeCompare(this._zhLetters[i], 'zh-CN') == -1) {
                        letterGroup[letter].push(item);
                    }
                })
            }

        })

        this._$alphabeticalIndex.forEach(letter => {
            letterGroup[letter].sort((a: string, b: string) => a.localeCompare(b));
            result.push({ letter: letter, data: letterGroup[letter] })
        })

        return result;
    }

    /**
     * @internal 
     */
    public _$jumpTo(i: number): void {
        if (!this._dataElementRefs || !this._titleElementRefs) {
            return;
        }
        this._dataElementRefs.nativeElement.scrollTop = this._titleElementRefs.toArray()[i].nativeElement.offsetTop;
    }

    private _setCurrent(i: number): void {
        if (!this._indexElementRefs) {
            return;
        }
        this._indexElementRefs.nativeElement.querySelector(".index-item-active").classList.remove('index-item-active');
        this._indexItemElementRefs.toArray()[i - 1].nativeElement.classList.add('index-item-active');
    }

    /**
     * @internal 
     */
    public _$selectedItemsChange($event) {
        this.valueChange.emit($event);
    }

    private _removeOnDestroy: CallbackRemoval;

    ngAfterViewInit() {
        const dataList = this._dataElementRefs.nativeElement;
        this._removeOnDestroy = dataList.addEventListener('scroll', () => {
            for (let i = 0; i < this._$alphabeticalIndex.length; i++) {
                if (this._titleElementRefs['_results'][i].nativeElement.offsetTop > dataList.scrollTop) {
                    this._setCurrent(i);
                    return;
                }
            }
        });
        this._indexItemElementRefs.toArray()[0].nativeElement.classList.add('index-item-active');
    }

    ngOnDestroy() {
        if (this._removeOnRefresh) {
            this._removeOnRefresh();
        }
        if (this._removeOnDestroy) {
            this._removeOnDestroy();
        }
    }
}

@NgModule({
    imports: [CommonModule, JigsawListModule, PerfectScrollbarModule],
    declarations: [JigsawAlphabeticalIndex],
    exports: [JigsawAlphabeticalIndex]
})
export class JigsawAlphabeticalIndexModule { }