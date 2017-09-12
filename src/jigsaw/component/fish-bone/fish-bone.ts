import {
    Component, NgModule, Input, ViewChildren, QueryList, forwardRef, AfterViewInit, Renderer2, ElementRef, EventEmitter, OnInit,
} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AbstractJigsawComponent} from "../common";
import {CommonUtils} from "../../core/utils/common-utils";

@Component({
    selector: 'j-fish-bone, jigsaw-fish-bone',
    templateUrl: './fish-bone.html',
    host: {
        '[class.jigsaw-fish-bone]': 'true'
    }
})
export class JigsawFishBone implements AfterViewInit {
    constructor(public renderer: Renderer2, public elementRef: ElementRef) {
    }

    @Input()
    public data: object[];

    @ViewChildren(forwardRef(() => JigsawFishBoneItem))
    private _fishBoneMainChildren: QueryList<JigsawFishBoneItem>;

    /**
    *
    * 按照父到子的顺序设置节点偏移量
    * */
    private _setFishBonePosition(fishBoneItems) {
        let fishBoneItemsArray = fishBoneItems.toArray();
        fishBoneItems.forEach((fishBoneItem, index) => {
            if (index === 0) {
                // 如果是第一个节点，默认偏移50
                fishBoneItem.left = 50;
            } else {
                // left偏移量等于前一个同级节点的偏移加maxField
                fishBoneItem.left = fishBoneItemsArray[index - 1].getNumberLeft() + fishBoneItemsArray[index - 1].getMaxField() + 30;
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
                //取其最后一个子节点的left偏移值 + 30px
                fishBoneItem.width = fishBoneItem.fishBoneChildren.last.getNumberLeft() + 30;
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
    private _rectifyAll(){
        this._FishBoneItems.forEach(fishBoneItem => {
            fishBoneItem.rectify();
        })
    }

    ngAfterViewInit() {
        this._cacheFishBoneItems(this._fishBoneMainChildren);

        setTimeout(() => {
            this._setFishBonePosition(this._fishBoneMainChildren);
            this._setFishBoneWidth(this._fishBoneMainChildren);
            setTimeout(() => {
                this._rectifyAll();
            }, 0)
        }, 0)
    }
}

@Component({
    selector: 'j-fish-bone-item, jigsaw-fish-bone-item',
    templateUrl: './fish-bone-item.html',
    host: {
        '[class.jigsaw-fish-bone-item]': 'true',
        '[style.width]': 'width',
        '[style.left]': 'left',
    }
})
export class JigsawFishBoneItem extends AbstractJigsawComponent implements AfterViewInit{
    private _itemEl: HTMLElement;

    constructor(elementRef: ElementRef) {
        super();
        this._itemEl = elementRef.nativeElement;
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

    private _left: string;

    public get left(): string {
        return this._left;
    }

    public set left(value: string) {
        this._left = CommonUtils.getCssValue(value);
    }

    public getNumberLeft(): number {
        return parseInt(this.left.replace('px', ''));
    }

    /**
     * 获取最大范围
     * 子节点的宽度 + 最后的子子节点的maxField 的最大值
     *
     * */
    public getMaxField(): number {
        if (this.fishBoneChildren.length) {
            this.fishBoneChildren.forEach(fishBoneItem => {
                let fishBoneItemWidth = fishBoneItem._itemEl.offsetWidth;
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
        if (this.index !== 0) {
            const preFishBone = this.parentFishBone.fishBoneChildren.toArray()[this.index - 1];
            this.left = preFishBone.maxField + preFishBone.getNumberLeft() + 30 + 'px';
        }

        if (this.fishBoneChildren.last) {
            this.width = this.fishBoneChildren.last.getNumberLeft() + 30 + 'px';
        }
    }

    public rectifyEvent = new EventEmitter<JigsawFishBoneItem>();

    ngAfterViewInit() {
        // 宽度由最后一个子节点的left值决定，所以要先计算各节点的left偏移量，left偏移量等于前一个同级节点的偏移加maxField
        // 如果是第一个节点，默认偏移50
        // 没有子节点时，默认宽度为100，写在css里

        // maxField依赖子节点的宽度
        // 先渲染最里面的子节点，逐层向上渲染

        // 异步发送事件，为了最外面的父组件能够在ngAfterViewInit中订阅到子组件的事件
        // 如果立即发送事件，则父组件订阅不到事件
        setTimeout(() => {
            this.rectifyEvent.emit(this);
        },0);
    }
}

@NgModule({
    imports: [CommonModule],
    declarations: [JigsawFishBone, JigsawFishBoneItem],
    exports: [JigsawFishBone]
})
export class JigsawFishBoneModule {

}
