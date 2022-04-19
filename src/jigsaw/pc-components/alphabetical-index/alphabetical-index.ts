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
        console.log(this._$sortedData)
    }

    /**
     * @internal 
     */
    public _$sortedData: string[] | ArrayCollection<string>;

    public _$letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'W', 'X', 'Y', 'Z', '#'];
    private _zhLetters = ['阿', '八', '嚓', '哒', '妸', '发', '旮', '哈', '讥', '咔', '垃', '痳', '拏', '噢', '妑', '七', '呥', '扨', '它', '穵', '夕', '丫', '帀'];

    @ViewChildren('indexTitle', { read: ElementRef })
    private _titleElementRefs: QueryList<ElementRef>;

    @ViewChild('dataList', { read: ElementRef })
    private _dataElementRefs: ElementRef;

    private _sortByFirstLetter(arr: string[]): string[] {
        if (!String.prototype.localeCompare) {
            return null;
        }

        const result = [];
        const letters = [...this._$letters];
        letters.unshift(letters.pop());
        let group: { letter: string, data: string[] };

        letters.forEach((letter, i) => {
            group = { letter: letter, data: [] }
            arr.forEach(item => {
                const word = item.trim().toUpperCase();
                const reg = new RegExp(`^${letter}`);
                if (reg.test(word)) {
                    group.data.push(item);
                } else if (!/^[A-Z#]/.test(word) && (!this._zhLetters[i - 1] || this._zhLetters[i - 1].localeCompare(word) <= 0) && word.localeCompare(this._zhLetters[i]) == -1) {
                    group.data.push(item);
                }
            })
            if (group.data.length) {
                group.data.sort((a: string, b: string) => { return a.localeCompare(b) })
            }
            result.push(group);
        })

        result.push(result.shift());
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