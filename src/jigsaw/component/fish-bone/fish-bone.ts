import {
    Component, NgModule, Input, ViewChildren, QueryList, forwardRef, AfterViewInit, Renderer2, ElementRef, OnInit,
} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AbstractJigsawComponent} from "../common";
import set = Reflect.set;

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


    setParentMaxField(fishBoneItems){
        /*let parentMaxField;
        fishBoneItems.forEach(fishBoneItem => {
            console.log(fishBoneItem);
            parentMaxField = fishBoneItem.maxField;
            this.setParentMaxField(fishBoneItem.fishBoneChildren)
        })*/
    }

    setFishBonePosition(fishBoneItems){
        let fishBoneItemsArray = fishBoneItems.toArray();
        fishBoneItems.forEach((fishBoneItem, index) => {
            if(index === 0){
                // 第一个固定偏移50px
                this.renderer.setStyle(fishBoneItem.itemEl, 'left', '100px');
                fishBoneItem.left = 100;

                /*const parentFishBone = fishBoneItem.parentFishBone;
                parentFishBone.parentFishBone.fishBoneChildren*/
            }else{
                // left偏移量等于前一个同级节点的偏移加maxField
                fishBoneItem.left = fishBoneItemsArray[index-1].left + fishBoneItemsArray[index-1].maxField + 20;
                this.renderer.setStyle(fishBoneItem.itemEl, 'left', fishBoneItem.left + 'px');

            }
            this.setFishBonePosition(fishBoneItem.fishBoneChildren);
        })
    }

    setFishBoneWidth(fishBoneItems){
        fishBoneItems.forEach(fishBoneItem => {
            if(fishBoneItem.fishBoneChildren.last){
                //取其最后一个子节点的left偏移值 + 20px
                fishBoneItem.width = fishBoneItem.fishBoneChildren.last.left + 20;
            }

            this.setFishBoneWidth(fishBoneItem.fishBoneChildren);
        })
    }

    ngAfterViewInit(){
        setTimeout(() => {
            this.setParentMaxField(this.fishBoneChildren);
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
        '[style.width]': 'width'
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
    isFirstNode: boolean;

    maxField: number = 50;

    left: number = 0;

    ngAfterViewInit(){
        // 先渲染最里面的子节点，逐层向上渲染
        if(!this.fishBoneChildren.length){
            this.width = '100px';
        }
        
        this.fishBoneChildren.forEach(fishBoneItem => {
            let fishBoneItemWidth = fishBoneItem.elementRef.nativeElement.offsetWidth;
            this.maxField =  fishBoneItemWidth > this.maxField ? fishBoneItemWidth : this.maxField;
        });

        //console.log(this.parentFishBone);
        setTimeout(() => {
            if(this.isFirstNode
                && this.parentFishBone
                && this.parentFishBone.parentFishBone
                && this.parentFishBone.parentFishBone.fishBoneChildren){
                console.log(this.parentFishBone.parentFishBone.fishBoneChildren);
                this.parentFishBone.parentFishBone.fishBoneChildren.forEach(fishBoneItem => {
                    console.log(fishBoneItem.width);
                })
            }
        }, 0)

    }
}

@NgModule({
    imports: [CommonModule],
    declarations: [JigsawFishBone, JigsawFishBoneItem],
    exports: [JigsawFishBone]
})
export class JigsawFishBoneModule {

}
