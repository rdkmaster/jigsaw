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

export type pinyinDictionary = {
    dynamicLoadingDict?: dictInfo;
    getStrPinyin: (str: string) => string;
}

export type dictInfo = {
    dictPath: string,
    dictId: string,
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
            this._sortDataAndJump(!!this.pinyinDictionary);
        })

        if (this.pinyinDictionary) {
            this._sortDataWithDict();
            return;
        }

        this._sortDataAndJump(false);
    }

    private _pinyinDictionary: pinyinDictionary;

    /**
     * 拼字字典配置
     * 
     * @NoMarkForCheckRequired
     */
    @Input()
    public get pinyinDictionary(): pinyinDictionary {
        return this._pinyinDictionary;
    }

    public set pinyinDictionary(value: pinyinDictionary) {
        if (!value || this._pinyinDictionary == value) {
            return;
        }
        this._pinyinDictionary = value;
        this._sortDataWithDict();

        if (this._removeOnRefresh) {
            this._removeOnRefresh();
        }
        this._removeOnRefresh = this._data.onRefresh(() => {
            this._sortDataAndJump(true);
        })
    }

    private _sortDataWithDict() {
        if (!this.pinyinDictionary.dynamicLoadingDict) {
            this._sortDataAndJump(true);
            return
        }

        if (!this.pinyinDictionary.dynamicLoadingDict.dictPath || !this.pinyinDictionary.dynamicLoadingDict.dictId) {
            console.error("缺少字典文件路径 或 字典文件ID");
            return;
        }
        const dictId = this.pinyinDictionary.dynamicLoadingDict.dictId;
        const dictFile = document.getElementById(dictId) as HTMLScriptElement;

        if (dictFile) {
            this._sortDataAndJump(true);
            return;
        }

        const dictPath = this.pinyinDictionary.dynamicLoadingDict.dictPath;
        const body = document.getElementsByTagName("body")[0];
        const script = document.createElement("script");

        script.type = "text/javascript";
        script.id = dictId;
        script.onload = () => {
            this._sortDataAndJump(true);
        }
        script.src = dictPath;

        body.appendChild(script);
    }

    private _sortDataAndJump(useDict: boolean): void {
        this._$sortedData = this._sortByFirstLetter(this._data, useDict);
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

    public _$enLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '#'];
    public _zhToEnletters = ['#', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'W', 'X', 'Y', 'Z'];
    private _zhLetters = ['阿', '八', '嚓', '哒', '妸', '发', '旮', '哈', '讥', '咔', '垃', '痳', '拏', '噢', '妑', '七', '呥', '扨', '它', '穵', '夕', '丫', '帀'];

    @ViewChildren('indexTitle', { read: ElementRef })
    private _titleElementRefs: QueryList<ElementRef>;

    @ViewChild('dataList', { read: ElementRef })
    private _dataElementRefs: ElementRef;

    @ViewChild('indexList', { read: ElementRef })
    private _indexElementRefs: ElementRef;

    @ViewChildren('indexListItem', { read: ElementRef })
    private _indexItemElementRefs: QueryList<ElementRef>;

    private _sortByFirstLetter(arr: ArrayCollection<string>, useDict: boolean): ArrayCollection<string> {
        if (!String.prototype.localeCompare) {
            return null;
        }

        const letterGroup = {}
        const result = new ArrayCollection([]);
        this._$enLetters.forEach(letter => {
            letterGroup[letter] = [];
        })

        if (useDict) {
            /* 使用字典 */
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

                const res = this.pinyinDictionary.getStrPinyin(word);
                if (/^[A-Z#]/.test(res)) {
                    const firstLetter = res.substr(0, 1);
                    letterGroup[firstLetter].push(item);
                } else {
                    letterGroup['#'].push(item);
                }
            })
        } else {
            /* 不使用字典 */
            arr.forEach(item => {
                if (CommonUtils.isUndefined(item)) {
                    return;
                }
                item += '';
                const word = item.trim().toUpperCase();
                if (/^[A-Z#]/.test(word)) {
                    const firstLetter = word.substr(0, 1);
                    letterGroup[firstLetter].push(item);
                } else {
                    this._zhToEnletters.forEach((letter, i) => {
                        if ((!this._zhLetters[i - 1] || this._zhLetters[i - 1].localeCompare(word, 'zh-CN') <= 0) && word.localeCompare(this._zhLetters[i], 'zh-CN') == -1) {
                            letterGroup[letter].push(item);
                        }
                    })
                }
            })
        }

        this._$enLetters.forEach(letter => {
            if (letterGroup[letter].length) {
                letterGroup[letter].sort((a: string, b: string) => { return a.localeCompare(b) })
            }
            result.push({ letter: letter, data: letterGroup[letter] })
        })

        return result;
    }

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

    public _$selectedItemsChange($event) {
        this.valueChange.emit($event);
    }

    public getFirstLetter(str: string): string {
        if (!str || /^ +$/g.test(str)) {
            return "";
        }
        const result = [];
        for (var i = 0; i < str.length; i++) {
            var unicode = str.charCodeAt(i);
            var ch = str.charAt(i);
            if (unicode >= 19968 && unicode <= 40869) {
                ch = window['pinyin_dict_firstletter'].all.charAt(unicode - 19968);
            }
            result.push(ch);
        }
        return result.join("");
    }

    private _removeOnDestroy: CallbackRemoval;

    ngAfterViewInit() {
        const dataList = this._dataElementRefs.nativeElement;
        this._removeOnDestroy = dataList.addEventListener('scroll', () => {
            for (let i = 0; i < 27; i++) {
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