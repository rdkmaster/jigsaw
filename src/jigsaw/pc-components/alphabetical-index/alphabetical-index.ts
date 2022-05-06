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
const _commonChinesePinyinReviser = {
    "椎": "Z", "搭": "D", "达": "D", "咳": "K", "磷": "L", "鳞": "L", "凛": "L", "伶": "L", "灵": "L", "玲": "L", "凌": "L",
    "铃": "L", "陵": "L", "菱": "L", "蛉": "L", "零": "L", "龄": "L", "岭": "L", "领": "L", "令": "L", "另": "L", "溜": "L",
    "刘": "L", "流": "L", "留": "L", "硫": "L", "馏": "L", "榴": "L", "瘤": "L", "柳": "L", "六": "L", "龙": "L", "笼": "L",
    "聋": "L", "隆": "L", "垄": "L", "拢": "L", "楼": "L", "搂": "L", "漏": "L", "卢": "L", "芦": "L", "炉": "L", "虏": "L",
    "鲁": "L", "陆": "L", "录": "L", "鹿": "L", "碌": "L", "路": "L", "露": "L", "驴": "L", "吕": "L", "旅": "L", "铝": "L",
    "屡": "L", "缕": "L", "履": "L", "律": "L", "虑": "L", "率": "L", "绿": "L", "氯": "L", "滤": "L", "卵": "L", "乱": "L",
    "掠": "L", "略": "L", "仑": "L", "伦": "L", "轮": "L", "论": "L", "罗": "L", "萝": "L", "逻": "L", "锣": "L", "箩": "L",
    "骡": "L", "螺": "L", "裸": "L", "洛": "L", "络": "L", "骆": "L", "落": "L", "韧": "R", "仍": "R", "日": "R", "戎": "R",
    "绒": "R", "荣": "R", "容": "R", "溶": "R", "蓉": "R", "熔": "R", "融": "R", "柔": "R", "揉": "R", "肉": "R", "如": "R",
    "儒": "R", "乳": "R", "辱": "R", "入": "R", "软": "R", "锐": "R", "瑞": "R", "润": "R", "若": "R", "弱": "R", "他": "T"
};

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

    private _classifyByFirstLetter(arr: ArrayCollection<string>): SortedIndexData {
        const letterGroup = {}
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
            const charCode = firstLetter.charCodeAt(0);
            if (charCode < 256) {
                // 非字母的 asc 码，含数字，都归入#
                letterGroup['#'].push(item);
                return;
            }
            // 剩下的都是unicode了
            const pinyin = this.pinyinDictionary?.[firstLetter] || _commonChinesePinyinReviser[firstLetter];
            if (pinyin) {
                letterGroup[pinyin].push(item);
                return;
            }
            // 剩下的是字典里没有的，使用通用方式处理
            const letter = _enLetters.find((letter, idx) => {
                if (idx > 0 && _zhLetters[idx - 1].localeCompare(firstLetter, 'zh-CN') > 0) {
                    return false;
                }
                return firstLetter.localeCompare(_zhLetters[idx], 'zh-CN') == -1;
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
export class JigsawAlphabeticalIndexModule {
}
