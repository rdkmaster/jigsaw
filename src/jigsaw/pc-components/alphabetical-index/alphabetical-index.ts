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
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { AbstractJigsawComponent, WingsTheme } from "../../common/common";
import { ArrayCollection } from '../../common/core/data/array-collection';
import { JigsawListModule } from '../list-and-tile/list';
import { CommonUtils, CallbackRemoval } from '../../common/core/utils/common-utils';

type Letter = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M'
    | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z' | '#';

type LetterData = {
    letter: Letter,
    data: ArrayCollection<string>
}

type SortedIndexData = ArrayCollection<LetterData>;

const _enLetters: Letter[] = ['#', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'W', 'X', 'Y', 'Z'];
const _zhLetters = ['阿', '八', '嚓', '哒', '妸', '发', '旮', '哈', '讥', '咔', '垃', '痳', '拏', '噢', '妑', '七', '呥', '扨', '它', '穵', '夕', '丫', '帀'];


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
    private _removeOnDataRefresh: CallbackRemoval;
    private _removeOnDictionaryRefresh: CallbackRemoval;

    private _data: ArrayCollection<string>;

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

        if (this._removeOnDataRefresh) {
            this._removeOnDataRefresh();
        }
        this._removeOnDataRefresh = this._data.onRefresh(() => {
            this._sortDataAndJump();
        });
        this._sortDataAndJump();
    }

    private _pinyinDictionary: string;

    /**
     * 拼字字典配置
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public get pinyinDictionary(): string {
        return this._pinyinDictionary;
    }

    public set pinyinDictionary(value: string) {
        if (!value || this._pinyinDictionary == value) {
            return;
        }
        this._pinyinDictionary = value;

        if (this._removeOnDictionaryRefresh) {
            this._removeOnDictionaryRefresh();
        }
        this._removeOnDictionaryRefresh = this._data.onRefresh(() => {
            this._sortDataAndJump();
        })
        this._sortDataAndJump();
    }

    private _sortDataAndJump(): void {
        this._$sortedData = this._classifyByFirstLetter(this._data);
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
     * @NoMarkForCheckRequired
     */
    public _$sortedData: SortedIndexData;

    @ViewChildren('indexTitle', { read: ElementRef })
    private _titleElementRefs: QueryList<ElementRef>;

    @ViewChild('dataList', { read: ElementRef })
    private _dataElementRefs: ElementRef;

    @ViewChild('indexList', { read: ElementRef })
    private _indexElementRefs: ElementRef;

    @ViewChildren('indexListItem', { read: ElementRef })
    private _indexItemElementRefs: QueryList<ElementRef>;

    /**
     * @internal
     */
    public _$alphabeticalIndex: Letter[] = [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
        'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '#'
    ];

    private _classifyByFirstLetter(arr: ArrayCollection<string>): SortedIndexData {
        const letterGroup = {}
        const result: SortedIndexData = new ArrayCollection([]);
        this._$alphabeticalIndex.forEach(letter => {
            letterGroup[letter] = [];
        });

        arr.forEach((item: string) => {
            if (CommonUtils.isUndefined(item)) {
                return;
            }
            const match = String(item).match(/^\s*(\S)/);
            if (!match) {
                letterGroup['#'].push(item);
                return;
            }
            const firstLetter = match[1].toUpperCase();
            if (/^[A-Z]/.test(firstLetter)) {
                letterGroup[firstLetter].push(item);
                return;
            }
            const charCode = firstLetter.charCodeAt(0)
            if (charCode < 256) {
                // 非字母的 asc 码，含数字，都归入#
                letterGroup['#'].push(item);
                return;
            }
            // 剩下的都是unicode了
            if (this.pinyinDictionary && charCode >= 19968 && charCode <= 40869) {
                const pinyin = this.pinyinDictionary.charAt(charCode - 19968);
                if (pinyin) {
                    letterGroup[pinyin].push(item);
                    return;
                }
            }
            // 剩下的是字典里没有的，使用通用方式处理
            const letter = _enLetters.find((letter, i) => {
                if (!(!_zhLetters[i - 1] || _zhLetters[i - 1].localeCompare(firstLetter, 'zh-CN') <= 0)) {
                    return false;
                }
                return firstLetter.localeCompare(_zhLetters[i], 'zh-CN') == -1;
            });
            letterGroup[letter].push(item);
        });

        this._$alphabeticalIndex.forEach(letter => {
            letterGroup[letter].sort((a: string, b: string) => a.localeCompare(b));
            result.push({ letter: letter, data: letterGroup[letter] });
        });

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

    private _removeCheckCurrentOnDestroy: Function;

    ngAfterViewInit() {
        const dataList = this._dataElementRefs.nativeElement;
        this._removeCheckCurrentOnDestroy = dataList.addEventListener('scroll', () => {
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
        if (this._removeOnDataRefresh) {
            this._removeOnDataRefresh();
        }
        if (this._removeOnDictionaryRefresh) {
            this._removeOnDictionaryRefresh();
        }
        if (this._removeCheckCurrentOnDestroy) {
            this._removeCheckCurrentOnDestroy();
        }
    }
}

@NgModule({
    imports: [CommonModule, JigsawListModule, PerfectScrollbarModule],
    declarations: [JigsawAlphabeticalIndex],
    exports: [JigsawAlphabeticalIndex]
})
export class JigsawAlphabeticalIndexModule { }
