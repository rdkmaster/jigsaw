import {
    ChangeDetectorRef,
    Component, ContentChildren,
    EventEmitter,
    forwardRef,
    Input,
    NgModule,
    Output,
    QueryList,
    OnInit,
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';
import {AbstractJigsawGroupComponent, AbstractJigsawOptionComponent} from "../tile/common";

@Component({
    selector: 'jigsaw-radio',
    template: '<ng-content></ng-content>',
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => JigsawRadioGroup), multi: true },
    ]
})
export class JigsawRadioGroup extends AbstractJigsawGroupComponent implements OnInit{

    @Input()
    public get value(): any {
        return this.selectedItems && this.selectedItems.length != 0  ? this.selectedItems[0] : null;
    }

    public set value(newValue: any) {
        if (newValue && this.value != newValue) {
           this.selectedItems = [newValue];
        }
    }

    @Output() public valueChange: EventEmitter<any> = new EventEmitter<any>();

    // 默认多选
    public multipleSelect: boolean = false;

    @ContentChildren(forwardRef(() => JigsawRadioOption))
    protected _items: QueryList<JigsawRadioOption>;

    ngOnInit(){
        super.ngOnInit();
        this.selectedItemsChange.subscribe(selectedItems => {
            if(selectedItems && selectedItems.length != 0){
                this.valueChange.emit(selectedItems[0]);
            }
        })
    }

}

@Component({
    selector: 'jigsaw-radio-option',
    templateUrl: 'radio-option.html',
    host: {
        "(click)": "_$handleClick()"
    }
})
export class JigsawRadioOption extends AbstractJigsawOptionComponent{
    constructor(public changeDetector: ChangeDetectorRef) {
        super(changeDetector);
    }

    /**
     * 点击组件触发
     * @internal
     */
    public _$handleClick(): void {
        if(!this.disabled){
            this.selectedChange.emit(this);
        }
    }

}

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [JigsawRadioGroup, JigsawRadioOption],
    exports: [JigsawRadioGroup, JigsawRadioOption]
})
export class JigsawRadioModule {

}
