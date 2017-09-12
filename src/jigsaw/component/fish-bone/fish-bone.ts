import {
    Component, NgModule, Input, ViewChildren, QueryList, forwardRef, AfterViewInit, Renderer2, ElementRef,
} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AbstractJigsawComponent} from "../common";

@Component({
    selector: 'j-fish-bone, jigsaw-fish-bone',
    templateUrl: './fish-bone.html',
    host: {
        '[class.jigsaw-fish-bone]': 'true'
    }
})
export class JigsawFishBone implements AfterViewInit{
    constructor(public renderer: Renderer2, public elementRef: ElementRef){
    }

    @Input()
    public data: object[];

    @ViewChildren(forwardRef(() => JigsawFishBoneItem) )
    public fishBoneChildren: QueryList<JigsawFishBoneItem>;

    setFishBonePosition(fishBoneItems){
        let fishBoneItemsArray = fishBoneItems.toArray();
        fishBoneItems.forEach((fishBoneItem, index) => {
            if(index === 0){
                // 如果是第一个节点，默认偏移50
                fishBoneItem.left = 50;
                this.renderer.setStyle(fishBoneItem.itemEl, 'left', fishBoneItem.left + 'px');
            }else{
                // left偏移量等于前一个同级节点的偏移加maxField
                fishBoneItem.left = fishBoneItemsArray[index-1].left + fishBoneItemsArray[index-1].getMaxField() + 30;
                this.renderer.setStyle(fishBoneItem.itemEl, 'left', fishBoneItem.left + 'px');
            }
            this.setFishBonePosition(fishBoneItem.fishBoneChildren);
        })
    }

    setFishBoneWidth(fishBoneItems){
        fishBoneItems.forEach(fishBoneItem => {
            if(fishBoneItem.fishBoneChildren.last){
                //取其最后一个子节点的left偏移值 + 30px
                fishBoneItem.width = fishBoneItem.fishBoneChildren.last.left + 30;
            }

            this.setFishBoneWidth(fishBoneItem.fishBoneChildren);
        })
    }

    ngAfterViewInit(){
        setTimeout(() => {
            this.setFishBonePosition(this.fishBoneChildren);
            this.setFishBoneWidth(this.fishBoneChildren);
        },0)
    }
}

@Component({
    selector: 'j-fish-bone-item, jigsaw-fish-bone-item',
    templateUrl: './fish-bone-item.html',
    host: {
        '[class.jigsaw-fish-bone-item]': 'true',
        '[style.width]': 'width',
    }
})
export class JigsawFishBoneItem extends AbstractJigsawComponent{
    public itemEl: HTMLElement;

    constructor(public renderer: Renderer2, public elementRef: ElementRef){
        super();
        this.itemEl = elementRef.nativeElement;
    }

    @Input()
    public data: object[];

    @Input()
    public childRotate: string;

    @ViewChildren(forwardRef(() => JigsawFishBoneItem) )
    public fishBoneChildren: QueryList<JigsawFishBoneItem>;

    @Input()
    parentFishBone: JigsawFishBoneItem;

    @Input()
    level: number = 0;

    @Input()
    index: number = 0;

    maxField: number = 0;

    public left: number = 0;

    /**
     * 获取最大范围
     * 子节点的宽度 + 最后的子子节点的maxField 的最大值
     *
    * */
    getMaxField(){
        if(this.fishBoneChildren.length){
            this.fishBoneChildren.forEach(fishBoneItem => {
                let fishBoneItemWidth = fishBoneItem.itemEl.offsetWidth;
                let childMaxField = 0;
                if(fishBoneItem.fishBoneChildren.last){
                    childMaxField = fishBoneItem.fishBoneChildren.last.maxField;
                }
                let maxField = fishBoneItemWidth + childMaxField;
                this.maxField = maxField > this.maxField ? maxField : this.maxField;
            });
        }else{
            this.maxField = 30;
        }

        return this.maxField;
    }

    /**
     * 调整最大范围
     * 调整偏移量
     * 调整宽度
     */
    rectify(){
        this.getMaxField();
        if(this.index !== 0){
            const preFishBone = this.parentFishBone.fishBoneChildren.toArray()[this.index - 1];
            this.left = preFishBone.maxField + preFishBone.left + 30;
            this.renderer.setStyle(this.itemEl, 'left', this.left + 'px');
        }

        if(this.fishBoneChildren.last){
            this.width = this.fishBoneChildren.last.left + 30 + 'px';
        }
    }

    ngAfterViewInit(){
        // 宽度由最后一个子节点的left值决定，所以要先计算各节点的left偏移量，left偏移量等于前一个同级节点的偏移加maxField
        // 如果是第一个节点，默认偏移50
        // 没有子节点时，默认宽度为100，写在css里

        // maxField依赖子节点的宽度
        // 先渲染最里面的子节点，逐层向上渲染
        setTimeout(() => {
            this.rectify();
        },2000)

    }
}

@NgModule({
    imports: [CommonModule],
    declarations: [JigsawFishBone, JigsawFishBoneItem],
    exports: [JigsawFishBone]
})
export class JigsawFishBoneModule {

}
