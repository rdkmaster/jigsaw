import {
    Component,
    NgModule,
    ChangeDetectionStrategy,
    Input
} from "@angular/core";
import { AbstractJigsawComponent, WingsTheme } from "../../common/common";
import { CommonModule } from "@angular/common";
import { ArrayCollection } from 'jigsaw/common/core/data/array-collection';

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
    @Input()
    data: string[] | ArrayCollection<string>;

    private _letters = ['#', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'w', 'x', 'y', 'z'];
    private _zhLetters = ['阿', '八', '嚓', '哒', '妸', '发', '旮', '哈', '讥', '咔', '垃', '痳', '拏', '噢', '妑', '七', '呥', '扨', '它', '穵', '夕', '丫', '帀'];

    sortByFirstLetter(arr: string[]): string[] {
        if (!String.prototype.localeCompare) {
            return null;
        }

        const result = [];
        let group: { letter: string, data: string[] };

        this._letters.forEach((letter, i) => {
            group = { letter: letter, data: [] }
            arr.forEach(item => {
                const word = item.trim().toLowerCase();
                const reg = new RegExp(`^${letter}`);
                if (reg.test(word)) {
                    group.data.push(item);
                } else if ((!this._zhLetters[i - 1] || this._zhLetters[i - 1].localeCompare(word) <= 0) && word.localeCompare(this._zhLetters[i]) == -1) {
                    group.data.push(item);
                }
            })
            if (group.data.length) {
                result.push(group);
                group.data.sort((a: string, b: string) => { return a.localeCompare(b) })
            }
        })
        return result;
    }
}

@NgModule({
    imports: [CommonModule],
    declarations: [JigsawAlphabeticalIndex],
    exports: [JigsawAlphabeticalIndex]
})
export class JigsawAlphabeticalIndexModule { }
