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
    EventEmitter, NgZone, ChangeDetectorRef,
} from "@angular/core";
import {CommonModule} from "@angular/common";
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {AbstractJigsawComponent, WingsTheme} from "../../common/common";
import {ArrayCollection} from '../../common/core/data/array-collection';
import {JigsawListModule} from '../list-and-tile/list';
import {CommonUtils, CallbackRemoval} from '../../common/core/utils/common-utils';

type Letter = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M'
    | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z' | '#';

export type LetterData = {
    letter: Letter,
    data: ArrayCollection<string>
}

type SortedIndexData = ArrayCollection<LetterData>;

export type PinyinDictionary = {
    [chineseChar: string]: Letter
};

const _enLetters: Letter[] = ['#', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'W', 'X', 'Y', 'Z'];
const _zhLetters = ['阿', '八', '嚓', '哒', '妸', '发', '旮', '哈', '讥', '咔', '垃', '痳', '拏', '噢', '妑', '七', '呥', '扨', '它', '穵', '夕', '丫', '帀'];
// 常用3千汉字在自动归类时的错漏修正表
// 采用下面这个结构更节约代码空间，但需要将其转换为 PinyinDictionary 所需的结构
const _tmpDict = {
    Z: "椎", D: "搭达", K: "咳", T: "他", R: '韧仍日戎绒荣容溶蓉熔融柔揉肉如儒乳辱入软锐瑞润若弱',
    L: '磷鳞凛伶灵玲凌铃陵菱蛉零龄岭领令溜刘流留硫馏榴瘤柳六龙笼聋隆垄拢搂漏卢芦炉虏鲁陆录鹿碌路露驴吕旅屡缕履律虑率绿氯滤卵乱掠略仑伦轮罗萝逻锣箩骡螺裸洛络骆落另楼铝论',
};
const _commonChinesePinyinReviser: PinyinDictionary = {};
for (let py in _tmpDict) {
    _tmpDict[py].split('').forEach(char => _commonChinesePinyinReviser[char] = <Letter>py);
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
    private _removeOnDataRefresh: CallbackRemoval;
    private _removeOnDictionaryRefresh: CallbackRemoval;

    public constructor(protected _cdr: ChangeDetectorRef, protected _zone?: NgZone) {
        super(_zone);
    }

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
            this._cdr.markForCheck();
        });
        this._sortDataAndJump();
    }

    private _pinyinDictionary: PinyinDictionary;

    /**
     * 多音字和个性化拼音映射修正
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public get pinyinDictionary(): PinyinDictionary {
        return this._pinyinDictionary;
    }

    public set pinyinDictionary(value: PinyinDictionary) {
        if (!value || this._pinyinDictionary == value) {
            return;
        }
        this._pinyinDictionary = value;

        if (this._removeOnDictionaryRefresh) {
            this._removeOnDictionaryRefresh();
        }
        this._removeOnDictionaryRefresh = this._data.onRefresh(() => this._sortDataAndJump());
        this._sortDataAndJump();
    }

    private _sortDataAndJump(): void {
        this._$sortedData = this._classifyByFirstChar();
        this.runAfterMicrotasks(() => this._$jumpTo(0));
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

    @ViewChildren('indexTitle', {read: ElementRef})
    private _titleElementRefs: QueryList<ElementRef>;

    @ViewChild('dataList', {read: ElementRef})
    private _dataElementRefs: ElementRef;

    @ViewChild('indexList', {read: ElementRef})
    private _indexElementRefs: ElementRef;

    @ViewChildren('indexListItem', {read: ElementRef})
    private _indexItemElementRefs: QueryList<ElementRef>;

    /**
     * @internal
     */
    public _$alphabeticalIndex: Letter[] = [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
        'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '#'
    ];

    private _classifyByFirstChar(): SortedIndexData {
        const letterGroup = {};
        this._$alphabeticalIndex.forEach(letter => {
            letterGroup[letter] = [];
        });
        this.data.forEach((item: string) => {
            if (CommonUtils.isUndefined(item)) {
                return;
            }
            const match = String(item).match(/^\s*(\S)/);
            if (!match) {
                letterGroup['#'].push(item);
                return;
            }
            const firstChar = match[1].toUpperCase();
            if (/^[A-Z]/.test(firstChar)) {
                letterGroup[firstChar].push(item);
                return;
            }
            const charCode = firstChar.charCodeAt(0);
            if (charCode < 256) {
                // 非字母的 asc 码，含数字，都归入#
                letterGroup['#'].push(item);
                return;
            }
            // 剩下的都是unicode了
            const pinyin = this.pinyinDictionary?.[firstChar] || _commonChinesePinyinReviser[firstChar];
            if (pinyin) {
                letterGroup[pinyin].push(item);
                return;
            }
            // 剩下的是字典里没有的，使用通用方式处理
            const letter = _enLetters.find((letter, idx) => {
                if (idx > 0 && _zhLetters[idx - 1].localeCompare(firstChar, 'zh-CN') > 0) {
                    return false;
                }
                return firstChar.localeCompare(_zhLetters[idx], 'zh-CN') == -1;
            });
            letterGroup[letter].push(item);
        });

        const result: SortedIndexData = new ArrayCollection([]);
        this._$alphabeticalIndex.forEach(letter => {
            letterGroup[letter].sort((a: string, b: string) => a.localeCompare(b));
            result.push({letter: letter, data: letterGroup[letter]});
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
            const refs = this._titleElementRefs.toArray();
            for (let i = 0; i < this._$alphabeticalIndex.length; i++) {
                if (refs[i].nativeElement.offsetTop > dataList.scrollTop) {
                    this._setCurrent(i);
                    return;
                }
            }
            this._setCurrent(this._$alphabeticalIndex.length);
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
export class JigsawAlphabeticalIndexModule {
}
