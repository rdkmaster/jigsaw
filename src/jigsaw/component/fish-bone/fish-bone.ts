import {
    Component, NgModule, Input, ViewChildren, QueryList, forwardRef, AfterViewInit, Renderer2, ElementRef, EventEmitter, OnInit,
} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AbstractJigsawComponent} from "../common";
import {fadeIn} from "../animations/fade-in";

@Component({
    selector: 'j-fish-bone, jigsaw-fish-bone',
    templateUrl: './fish-bone.html',
    host: {
        '[class.jigsaw-fish-bone]': 'true',
        '[class.jigsaw-fish-bone-left]': 'direction === "left"',
        '[class.jigsaw-fish-bone-right]': 'direction === "right"',
        '[class.jigsaw-fish-bone-white]': 'theme === "white"',
        '[class.jigsaw-fish-bone-dark]': 'theme === "dark"',
        '[style.width]': 'width'
    }
})
export class JigsawFishBone extends AbstractJigsawComponent implements AfterViewInit, OnInit {
    constructor(private _renderer: Renderer2, private _elementRef: ElementRef) {
        super();
    }

    @Input()
    public data: object[];

    @Input()
    public direction: string = 'left';

    @Input()
    public theme: string = 'white';

    @ViewChildren(forwardRef(() => JigsawFishBoneItem))
    private _fishBoneMainChildren: QueryList<JigsawFishBoneItem>;

    /**
     *
     * 按照父到子的顺序设置节点偏移量
     * */
    private _setFishBonePosition(fishBoneItems) {
        let fishBoneItemsArray = fishBoneItems.toArray();
        fishBoneItems.forEach((fishBoneItem, index) => {
            if (fishBoneItem.level !== 0) {
                if (index === 0) {
                    // 如果是第一个节点，默认偏移50
                    fishBoneItem.left = 50;
                } else {
                    // left偏移量等于前一个同级节点的偏移加maxField
                    fishBoneItem.left = fishBoneItemsArray[index - 1].left + fishBoneItemsArray[index - 1].getMaxField() + 30;
                }
                this._renderer.setStyle(fishBoneItem.itemEl, 'left', fishBoneItem.left + 'px');
            }
            this._setFishBonePosition(fishBoneItem.fishBoneChildren);
        })
    }

    /**
     *
     * 按照父到子的顺序设置节点宽度
     * */
    private _setFishBoneWidth(fishBoneItems) {
        fishBoneItems.forEach(fishBoneItem => {
            if (fishBoneItem.fishBoneChildren.last) {
                // 取其最后一个子节点的left偏移值 + 30px
                // 没有子节点，宽度为默认值100，写在css里
                fishBoneItem.width = fishBoneItem.fishBoneChildren.last.left + 30;
                this._renderer.setStyle(fishBoneItem.itemEl, 'width', fishBoneItem.width);
            }
            this._setFishBoneWidth(fishBoneItem.fishBoneChildren);
        })
    }

    private _FishBoneItems: Array<JigsawFishBoneItem> = [];

    /**
     *
     * 按照子到父的顺序存储节点
     * */
    private _cacheFishBoneItems(fishBoneItems) {
        fishBoneItems.forEach(fishBoneItem => {
            fishBoneItem.rectifyEvent.subscribe(() => {
                this._FishBoneItems.push(fishBoneItem);
            });
            this._cacheFishBoneItems(fishBoneItem.fishBoneChildren);
        })
    }

    /**
     *
     * 按照子到父的顺序修正节点的偏移量和宽度
     * */
    private _rectifyAll() {
        this._FishBoneItems.forEach(fishBoneItem => {
            fishBoneItem.rectify();
        })
    }

    /**
     *
     * 计算最外层的父节点的偏移
     */
    private _setFishBoneMainPosition(fishBoneMainChildren) {
        const fishBoneMainArray = fishBoneMainChildren.toArray();
        fishBoneMainChildren.forEach((fishBoneItem, index) => {
            if (index <= 1) {
                fishBoneItem.left = 0;
            } else {
                const prePreFishBoneMain = fishBoneMainArray[index - 2];
                fishBoneItem.left = prePreFishBoneMain.left + prePreFishBoneMain.getMaxField() + 30;
            }
            this._renderer.setStyle(fishBoneItem.itemEl, 'left', fishBoneItem.left + 'px');
        })
    }

    ngOnInit() {
        super.ngOnInit();
        if (this.height) {
            this._renderer.setStyle(this._elementRef.nativeElement, 'padding-top',
                (parseInt(this.height.replace('px', '')) - 4) / 2 + 'px');
            this._renderer.setStyle(this._elementRef.nativeElement, 'padding-bottom',
                (parseInt(this.height.replace('px', '')) - 4) / 2 + 'px');
        }
    }

    ngAfterViewInit() {
        this._cacheFishBoneItems(this._fishBoneMainChildren);
        setTimeout(() => {
            this._setFishBonePosition(this._fishBoneMainChildren);
            this._setFishBoneWidth(this._fishBoneMainChildren);
            this._rectifyAll();
            this._setFishBoneMainPosition(this._fishBoneMainChildren);
        }, 0)
    }
}

@Component({
    selector: 'j-fish-bone-item, jigsaw-fish-bone-item',
    templateUrl: './fish-bone-item.html',
    host: {
        '[class.jigsaw-fish-bone-item]': 'true',
    },
    animations: [
        fadeIn
    ]
})
export class JigsawFishBoneItem extends AbstractJigsawComponent implements AfterViewInit {
    public itemEl: HTMLElement;

    constructor(private _renderer: Renderer2, elementRef: ElementRef) {
        super();
        this.itemEl = elementRef.nativeElement;
    }

    @Input()
    public data: object[];

    @Input()
    public childRotate: string;

    @ViewChildren(forwardRef(() => JigsawFishBoneItem))
    public fishBoneChildren: QueryList<JigsawFishBoneItem>;

    @Input()
    public parentFishBone: JigsawFishBoneItem;

    @Input()
    public level: number = 0;

    @Input()
    public index: number = 0;

    public maxField: number = 0;

    public left: number = 0;

    public _$state;

    /**
     * 获取最大范围
     * 子节点的宽度 + 最后的子子节点的maxField 的最大值
     * */
    public getMaxField(): number {
        if (this.fishBoneChildren.length) {
            this.fishBoneChildren.forEach(fishBoneItem => {
                let fishBoneItemWidth = fishBoneItem.itemEl.offsetWidth;
                let childMaxField = 0;
                if (fishBoneItem.fishBoneChildren.last) {
                    childMaxField = fishBoneItem.fishBoneChildren.last.maxField;
                }
                let maxField = fishBoneItemWidth + childMaxField;
                this.maxField = maxField > this.maxField ? maxField : this.maxField;
            });
        } else {
            this.maxField = 30;
        }

        return this.maxField;
    }

    /**
     * 调整最大范围
     * 调整偏移量
     * 调整宽度
     */
    public rectify() {
        this.getMaxField();
        if (this.level !== 0 && this.index !== 0) {
            // 最外层的父节点另外计算
            // index = 0 的采用默认值
            const preFishBone = this.parentFishBone.fishBoneChildren.toArray()[this.index - 1];
            this.left = preFishBone.maxField + preFishBone.left + 30;
            // 用setStyle保持同步，绑定[style.left]是异步的
            this._renderer.setStyle(this.itemEl, 'left', this.left + 'px');
        }

        if (this.fishBoneChildren.last) {
            this.width = this.fishBoneChildren.last.left + 30 + 'px';
            this._renderer.setStyle(this.itemEl, 'width', this.width);
        }
    }

    public rectifyEvent = new EventEmitter();

    ngOnInit() {
        super.ngOnInit();
        this._$state = 'in'
    }

    ngAfterViewInit() {
        // 宽度由最后一个子节点的left值决定，所以要先计算各节点的left偏移量，left偏移量等于前一个同级节点的偏移加maxField
        // 如果是第一个节点，默认偏移50
        // 没有子节点时，默认宽度为100，写在css里

        // maxField依赖子节点的宽度
        // 先渲染最里面的子节点，逐层向上渲染

        // 异步发送事件，为了最外面的父组件能够在ngAfterViewInit中订阅到子组件的事件
        // 如果立即发送事件，则父组件订阅不到事件
        setTimeout(() => {
            this.rectifyEvent.emit();
        }, 0);

        // 标识没有子节点
        if (!this.fishBoneChildren.length) {
            this._renderer.addClass(this.itemEl, 'jigsaw-fish-bone-item-no-child');
        }

    }
}

@NgModule({
    imports: [CommonModule],
    declarations: [JigsawFishBone, JigsawFishBoneItem],
    exports: [JigsawFishBone]
})
export class JigsawFishBoneModule {

}
