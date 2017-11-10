import {
    Component, NgModule, Input, ViewChildren, QueryList, forwardRef, AfterViewInit, Renderer2, ElementRef, EventEmitter, OnDestroy, OnInit,
} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AbstractJigsawComponent} from "../common";
import {fadeIn} from "../animations/fade-in";
import {CallbackRemoval} from "../../core/utils/common-utils";
import {TreeData} from "../../core/data/tree-data";
import {JigsawTrustedHtmlModule} from "../../directive/trusted-html/trusted-html";

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

    private _dataCallbackRemoval: CallbackRemoval;

    private _data: TreeData;

    @Input()
    get data(): TreeData {
        return this._data;
    }

    set data(value: TreeData) {
        this._data = value;
        if (this._dataCallbackRemoval) {
            this._dataCallbackRemoval();
        }
        this._dataCallbackRemoval = this._data.onRefresh(this.ngAfterViewInit, this);
    }

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
            this._cacheFishBoneItems(fishBoneItem.childBones);
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

    private _getMaxRangeHeight(cb) {
        return Math.max(...this._firstLevelBones.filter(cb).reduce((arr, fishBoneItem) => {
            const lastChild = fishBoneItem.childBones.last;
            if (lastChild) {
                // 有子节点
                arr.push(lastChild.rangeHeight + lastChild.left);
            } else {
                // 没有子节点
                arr.push(fishBoneItem.itemEl.offsetWidth);
            }
            return arr
        }, []));
    }

    private _setRangeHeight() {
        // 上部的高度
        const upHeight = Math.cos(30 * 0.017453293) * this._getMaxRangeHeight((fishBoneItem, index) => {
            return (index + 1) % 2 === 1;
        }) + 30;

        // 下部的高度
        const downHeight = Math.cos(30 * 0.017453293) * this._getMaxRangeHeight((fishBoneItem, index) => {
            return (index + 1) % 2 === 0;
        }) + 30;

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
        if (this.height) {
            // 组件设置高度，加上外框的滚动条
            this._renderer.setStyle(fishBoneFramework, 'overflow-y', 'scroll');
        } else {
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
        if (this._dataCallbackRemoval) {
            this._dataCallbackRemoval();
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
    private _itemContent: HTMLElement;
    private _itemDescription: HTMLElement;

    constructor(private _renderer: Renderer2, elementRef: ElementRef) {
        super();
        this.itemEl = elementRef.nativeElement;
    }

    @Input()
    public data: TreeData;

    @Input()
    public childRotate: string;

    @ViewChildren(forwardRef(() => JigsawFishBoneItem))
    public childBones: QueryList<JigsawFishBoneItem>;

    @Input()
    public parentBone: JigsawFishBoneItem;

    @Input()
    public level: number = 0;

    @Input()
    public index: number = 0;

    @Input()
    public firstLevelRotate: string;

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
        if (this.childBones.length) {
            this.rangeHeight = Math.max(...this.childBones.reduce((arr, fishBoneItem) => {
                let childRange = 0;
                const lastChild = fishBoneItem.childBones.last;
                if (lastChild && lastChild.rangeHeight > 30) {
                    childRange = lastChild.rangeHeight + lastChild.left;
                } else {
                    if (this.firstLevelRotate == 'down') {
                        // 主骨在下面，需要考虑内容的伸展
                        childRange = fishBoneItem.itemEl.offsetWidth + fishBoneItem._itemContent.offsetHeight / Math.tan(60 * 0.017453293);
                    } else {
                        //  主骨在上面
                        childRange = fishBoneItem.itemEl.offsetWidth;
                    }
                }
                arr.push(childRange);
                return arr;
            }, []));
        } else {
            // 没有子节点
            if (this.firstLevelRotate == 'up') {
                // 主骨在上面
                this.rangeHeight = this._itemContent.offsetHeight / Math.sin(60 * 0.017453293);
            } else if (this.firstLevelRotate == 'down') {
                // 主骨在下面
                this.rangeHeight = this._itemDescription.offsetHeight;
            }
        }
    }

    /**
     * 计算偏移并设置样式
     * @private
     */
    private _setOffset() {
        if (this.level !== 0) {
            // 最外层的父节点另外计算
            if (this.firstLevelRotate == 'down' && this.childBones.length === 0) {
                // 主骨在下面，没有子节点
                if (this.index === 0) {
                    // 第一个如果内容大于默认值，则由内容撑开
                    const contentHeight = this._itemContent.offsetHeight / Math.sin(60 * 0.017453293) + 30;
                    this.left = contentHeight > 50 ? contentHeight : 50;
                } else {
                    // 后面的也要加上自身内容
                    const preBone = this.parentBone.childBones.toArray()[this.index - 1];
                    this.left = preBone.left + preBone.rangeHeight + 30 + this._itemContent.offsetHeight / Math.sin(60 * 0.017453293);
                }
            } else {
                if (this.index === 0) {
                    // 第一个节点是默认偏移50px，写在css里面
                    this.left = this._itemDescription.offsetHeight + 30 > 50 ? this._itemDescription.offsetHeight + 30 : 50;
                } else {
                    this.calculateOffsetLeft(this.parentBone.childBones.toArray()[this.index - 1]);
                }
            }
        }
    }

    /**
     * 计算偏移的通用方法
     * @param fishBoneItem
     */
    public calculateOffsetLeft(fishBoneItem) {
        // fishBoneItem.rangeHeight 为0时，取30
        const rangeHeight = fishBoneItem.rangeHeight > 30 ? fishBoneItem.rangeHeight : 30;
        this.left = fishBoneItem.left + rangeHeight + this._itemDescription.offsetHeight + 30;
    }

    /**
     * 计算宽度并设置样式
     * @private
     */
    private _setWidth() {
        if (this.childBones.last) {
            // 取其最后一个子节点的left偏移值 + 30px
            this.width = this.childBones.last.left + 30 + 'px';
            // 有子节点时，内容宽度设成和鱼骨宽度相同
            this._renderer.setStyle(this._itemContent, 'width', '100%');
        } else {
            if (this.firstLevelRotate == 'down') {
                // 主骨在下面， 没有子节点
                this.width = this._itemContent.offsetWidth + 'px';
            } else if (this.firstLevelRotate == 'up') {
                // 主骨在上面，没有子节点，宽度为内容的宽度+高度，内容的最小宽度为100px，写在css里
                this.width = this._itemContent.offsetHeight / Math.tan(60 * 0.017453293) + this._itemContent.offsetWidth + 'px';
                // 纠正内容和鱼骨交叉
                this._renderer.setStyle(this._itemContent, 'left', this._itemContent.offsetHeight / Math.tan(60 * 0.017453293) + 'px');
            }
        }
        // 设置鱼骨宽度样式
        this._renderer.setStyle(this.itemEl, 'width', this.width);
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

    public rectifyEvent = new EventEmitter();

    ngOnInit() {
        super.ngOnInit();
        this._$state = 'in';
        this._itemContent = <HTMLElement>this.itemEl.querySelector('.jigsaw-fish-bone-item-content');
        this._itemDescription = <HTMLElement>this.itemEl.querySelector('.jigsaw-fish-bone-item-description');
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
        if (!this.childBones.length) {
            this._renderer.addClass(this.itemEl, 'jigsaw-fish-bone-item-no-child');
        }

    }
}

@NgModule({
    imports: [CommonModule, JigsawTrustedHtmlModule],
    declarations: [JigsawFishBone, JigsawFishBoneItem],
    exports: [JigsawFishBone]
})
export class JigsawFishBoneModule {

}
