import {
    Component,
    NgModule,
    ChangeDetectionStrategy,
    Input,
    ViewChildren,
    ElementRef,
    QueryList,
    ViewChild
} from "@angular/core";
import { AbstractJigsawComponent, WingsTheme } from "../../common/common";
import { CommonModule } from "@angular/common";
import { ArrayCollection } from 'jigsaw/common/core/data/array-collection';
import { JigsawListModule } from '../list-and-tile/list';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

export type alphabeticalIndexData = string[] | ArrayCollection<string>;
@WingsTheme('alphabetical-index.scss')
@Component({
    selector: "jigsaw-alphabetical-index,j-alphabetical-index",
    templateUrl: "alphabetical-index.html",
    host: {
        "[attr.data-theme]": "theme",
        "[class.jigsaw-alphabetical-index-host]": "true",
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawAlphabeticalIndex extends AbstractJigsawComponent {
    _data: alphabeticalIndexData

    @Input()
    public get data() {
        return this._data;
    }

    public set data(value: alphabeticalIndexData) {
        this._data = value;
        this._$sortedData = this._sortByFirstLetter(this._data);
    }

    /**
     * @internal 
     */
    public _$sortedData: string[] | ArrayCollection<string>;

    public _$enLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '#'];
    public _zhToEnletters = ['#', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'W', 'X', 'Y', 'Z'];
    private _zhLetters = ['阿', '八', '嚓', '哒', '妸', '发', '旮', '哈', '讥', '咔', '垃', '痳', '拏', '噢', '妑', '七', '呥', '扨', '它', '穵', '夕', '丫', '帀'];

    @ViewChildren('indexTitle', { read: ElementRef })
    private _titleElementRefs: QueryList<ElementRef>;

    @ViewChild('dataList', { read: ElementRef })
    private _dataElementRefs: ElementRef;

    private _sortByFirstLetter(arr: string[]): string[] {
        if (!String.prototype.localeCompare) {
            return null;
        }

        const letterGroup = {}
        const result = [];
        this._$enLetters.forEach(letter => {
            letterGroup[letter] = [];
        })

        arr.forEach(item => {
            const word = item.trim().toUpperCase();
            if (/^[A-Z#]/.test(word)) {
                const firstLetter = word.substr(0, 1);
                letterGroup[firstLetter].push(item);
            } else {
                this._zhToEnletters.forEach((letter, i) => {
                    if ((!this._zhLetters[i - 1] || this._zhLetters[i - 1].localeCompare(word) <= 0) && word.localeCompare(this._zhLetters[i]) == -1) {
                        letterGroup[letter].push(item);
                    }
                })
            }
        })

        this._$enLetters.forEach(letter => {
            if (letterGroup[letter].length) {
                letterGroup[letter].sort((a: string, b: string) => { return a.localeCompare(b) })
            }
            result.push({ letter: letter, data: letterGroup[letter] })
        })

        return result;
    }

    public _$jumpTo(i: number) {
        this._dataElementRefs.nativeElement.scrollTop = this._titleElementRefs.toArray()[i].nativeElement.offsetTop;
    }
}

@NgModule({
    imports: [CommonModule, JigsawListModule, PerfectScrollbarModule],
    declarations: [JigsawAlphabeticalIndex],
    exports: [JigsawAlphabeticalIndex]
})
export class JigsawAlphabeticalIndexModule { }