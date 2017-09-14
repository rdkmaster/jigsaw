import {
    Component, NgModule, Input, ViewChildren, QueryList, forwardRef, AfterViewInit, Renderer2, ElementRef, EventEmitter, OnDestroy, OnInit,
} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AbstractJigsawComponent} from "../common";
import {fadeIn} from "../animations/fade-in";
import {CallbackRemoval} from "../../core/utils/common-utils";
import {JigsawScrollBarModule} from "../../directive/scrollbar/scrollbar";

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
export class JigsawFishBone extends AbstractJigsawComponent implements AfterViewInit, OnDestroy, OnInit {
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
    private _firstLevelBones: QueryList<JigsawFishBoneItem>;

    private _allFishBones: Array<JigsawFishBoneItem> = [];

    /**
     *
     * 按照子到父的顺序存储节点
     * */
    private _cacheFishBoneItems(fishBoneItems) {
        fishBoneItems.forEach(fishBoneItem => {
            fishBoneItem.rectifyEvent.subscribe(() => {
                this._allFishBones.push(fishBoneItem);
            });
            this._cacheFishBoneItems(fishBoneItem.fishBoneChildren);
        })
    }

    /**
     *
     * 按照子到父的顺序设置节点的偏移量和宽度
     * 节点的偏移前一个同级节点的 left + rangeHeight
     * 父节点的宽度依赖最后一个子节点的 left + rangHeight
     *
     * */
    private _setAllBoneAttribute() {
        this._allFishBones.forEach(fishBoneItem => {
            fishBoneItem.setBoneAttribute();
        })
    }

    /**
     *
     * 计算最外层的父节点的偏移
     */
    private _setFirstLevelBoneOffset(fishBoneMainChildren) {
        const fishBoneMainArray = fishBoneMainChildren.toArray();
        fishBoneMainChildren.forEach((fishBoneItem, index) => {
            if (index <= 1) {
                // 最外层的鱼骨 前面两个偏移0px
                fishBoneItem.left = 0;
            } else {
                // 最外层的鱼骨是上下排列的，所以用前前节点计算
                fishBoneItem.calculateOffsetLeft(fishBoneMainArray[index - 2]);
            }
        })
    }

    private _getMaxHeight(cb) {
        return Math.max(...this._firstLevelBones.filter(cb).reduce((arr, fishBoneItem) => {
            const lastChild = fishBoneItem.fishBoneChildren.last;
            if (lastChild) {
                arr.push(lastChild.rangeHeight + lastChild.left);
            }
            return arr
        }, []));
    }

    private _setRangeHeight() {
        // 上部的高度
        const upHeight = this._getMaxHeight((fishBoneItem, index) => {
            return (index + 1) % 2 === 1;
        });

        // 下部的高度
        const downHeight = this._getMaxHeight((fishBoneItem, index) => {
            return (index + 1) % 2 === 0;
        });

        const host = this._elementRef.nativeElement;
        // 横向的主骨
        const mainBone = host.querySelector('.jigsaw-fish-bone-main');
        // 鱼骨的范围框，和整个鱼骨的宽度和高度相同
        const fishBoneRange = host.querySelector('.jigsaw-fish-bone-range');
        // 鱼骨组件的外框，和组件设置的宽高相同
        const fishBoneFramework = host.querySelector('.jigsaw-fish-bone-framework');

        this._renderer.setStyle(fishBoneRange, 'height', upHeight + downHeight + 'px');
        // 设置主骨在范围框中的位置
        this._renderer.setStyle(mainBone, 'top', upHeight + 'px');
        if(this.height){
            // 组件设置高度，加上外框的滚动条
            this._renderer.setStyle(fishBoneFramework, 'overflow-y', 'scroll');
        }else {
            // 组件不设置高度，去掉外框的滚动条，组件自适应范围框的高度
            this._renderer.setStyle(host, 'height', upHeight + downHeight + 'px');
            this._renderer.setStyle(fishBoneFramework, 'overflow-y', 'hidden');
        }
    }

    private _setRangeWidth() {
        const maxOffsetBone = this._firstLevelBones.toArray().sort((item1, item2) => item2.left - item1.left)[0];
        const host = this._elementRef.nativeElement;
        const mainBone = host.querySelector('.jigsaw-fish-bone-main');
        const fishBoneRange = host.querySelector('.jigsaw-fish-bone-range');
        const fishBoneFramework = host.querySelector('.jigsaw-fish-bone-framework');
        const hostWidth = host.offsetWidth;
        if (maxOffsetBone) {
            // 主骨的最小宽度
            const boneWidth = maxOffsetBone.left + maxOffsetBone.rangeHeight;
            // 组件范围框的宽度，主骨宽度+鱼头+鱼尾
            const rangeWidth = boneWidth + 146 + 80;

            if (rangeWidth > hostWidth) {
                // 范围宽度大于组件宽度，即溢出
                // 主骨宽度等于主骨最小宽度
                this._renderer.setStyle(mainBone, 'width', boneWidth + 'px');
                // 鱼骨范围宽度
                this._renderer.setStyle(fishBoneRange, 'width', rangeWidth + 'px');
                // 加上外框的滚动条
                this._renderer.setStyle(fishBoneFramework, 'overflow-x', 'scroll');
            } else {
                // 范围宽度小于组件宽度
                // 主骨宽度等于组件宽度-鱼头-鱼尾，即自适应组件宽度
                this._renderer.setStyle(mainBone, 'width', hostWidth - 80 - 146 + 'px');
                // 范围宽度等于组件宽度
                this._renderer.setStyle(fishBoneRange, 'width', hostWidth + 'px');
                // 去掉外框的滚动条
                this._renderer.setStyle(fishBoneFramework, 'overflow-x', 'hidden');
            }
        }
    }

    private _removeWindowListener: CallbackRemoval;

    ngAfterViewInit() {
        this._cacheFishBoneItems(this._firstLevelBones);
        setTimeout(() => {
            this._setAllBoneAttribute();
            this._setFirstLevelBoneOffset(this._firstLevelBones);
            this._setRangeHeight();
            this._setRangeWidth();
        }, 0);

        this._removeWindowListener = this._renderer.listen('window',
            'resize', () => this._setRangeWidth());
    }

    ngOnDestroy() {
        if (this._removeWindowListener) {
            this._removeWindowListener();
        }
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

    public rangeHeight: number = 0;

    // 默认偏移50，后面只有第一个节点是默认值
    private _left: number = 50;

    public get left(): number {
        return this._left;
    }

    public set left(value: number) {
        this._left = value;
        // 用setStyle保持同步，绑定[style.left]是异步的
        this._renderer.setStyle(this.itemEl, 'left', value + 'px');
    }

    public _$state;

    /**
     * 获取最大范围高度
     * 比较各子节点伸展高度
     * 伸展高度：子节点有子节点，并且最后一个子节点的rangeHeight不等于0，取其最后一个子节点的rangeHeight + left；
     *          其他取子节点自身的宽度
     * */
    private _setRangeHeight() {
        if (this.fishBoneChildren.length) {
            this.rangeHeight = Math.max(...this.fishBoneChildren.reduce((arr, fishBoneItem) => {
                let childRange = 0;
                const lastChild = fishBoneItem.fishBoneChildren.last;
                if (lastChild && lastChild.rangeHeight != 0) {
                    childRange = lastChild.rangeHeight + lastChild.left;
                } else {
                    childRange = fishBoneItem.itemEl.offsetWidth;
                }
                arr.push(childRange);
                return arr;
            }, []));
        } else {
            this.rangeHeight = 0;
        }
    }

    /**
     * 计算偏移并设置样式
     * @private
     */
    private _setOffset() {
        if (this.level !== 0 && this.index !== 0) {
            // 最外层的父节点另外计算
            // index = 0 的采用默认值
            this.calculateOffsetLeft(this.parentFishBone.fishBoneChildren.toArray()[this.index - 1]);
        }
    }

    /**
     * 计算宽度并设置样式
     * @private
     */
    private _setWidth() {
        if (this.fishBoneChildren.last) {
            // 取其最后一个子节点的left偏移值 + 30px
            // 没有子节点，宽度为默认值100，写在css里
            this.width = this.fishBoneChildren.last.left + 30 + 'px';
            this._renderer.setStyle(this.itemEl, 'width', this.width);
        }
    }

    /**
     * 设置范围高度
     * 设置偏移
     * 设置宽度
     */
    public setBoneAttribute() {
        this._setRangeHeight();
        this._setOffset();
        this._setWidth();
    }

    /**
     * 计算偏移的通用方法
     * @param fishBoneItem
     */
    public calculateOffsetLeft(fishBoneItem) {
        // fishBoneItem.rangeHeight 为0时，取30
        const rangeHeight = fishBoneItem.rangeHeight ? fishBoneItem.rangeHeight : 30;
        this.left = fishBoneItem.left + rangeHeight + 30;
    }

    public rectifyEvent = new EventEmitter();

    ngOnInit() {
        super.ngOnInit();
        this._$state = 'in';
    }

    ngAfterViewInit() {
        // 宽度由最后一个子节点的left值决定，所以要先计算各节点的left偏移量，left偏移量等于前一个同级节点的偏移加rangeHeight
        // 如果是第一个节点，默认偏移50，写在css里
        // 没有子节点时，默认宽度为100，写在css里

        // rangeHeight依赖子节点的宽度
        // 先渲染最里面的子节点，逐层向上渲染

        // 异步发送事件，为了最外面的父组件能够在ngAfterViewInit中订阅到子组件的事件
        // 如果立即发送事件，则父组件订阅不到事件
        setTimeout(() => {
            this.rectifyEvent.emit();
        }, 0);

        // 标识没有子节点的，没有子节点的节点文本放在上面
        if (!this.fishBoneChildren.length) {
            this._renderer.addClass(this.itemEl, 'jigsaw-fish-bone-item-no-child');
        }

    }
}

@NgModule({
    imports: [CommonModule, JigsawScrollBarModule],
    declarations: [JigsawFishBone, JigsawFishBoneItem],
    exports: [JigsawFishBone]
})
export class JigsawFishBoneModule {

}
