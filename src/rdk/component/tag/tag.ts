import {Component, ElementRef, EventEmitter, Input, NgModule, OnInit, Optional, Output, Renderer2} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AnimationDestroy} from "../animations/destroy";
import {AbstractRDKComponent} from "../core";

export type TagGroupValue = Array<{ [index: string]: any }>;

@Component({
    selector: 'rdk-tag-group',
    template: `
        <div class="rdk-tag-group">
            <rdk-tag *ngFor="let tagItem of data" [tagItem]="tagItem"
                     closable='false'>
                {{tagItem[labelField]}}
            </rdk-tag>
        </div>

    `,
    host: {
        '[style.width]': 'width',
        '[style.height]': 'height',
        '[style.line-height]': 'height',
        '[style.background]': 'color',
        '[style.border-color]': 'color'
    },
    styleUrls: ['tag-group.scss']
})

export class RdkTagGroup extends AbstractRDKComponent implements OnInit {

    private _data: TagGroupValue = null;
    @Input()
    public get data(): TagGroupValue {
        return this._data;
    }

    public set data(value: TagGroupValue) {
        this._data = value;

    }

    @Output()
    public dataChange = new EventEmitter<TagGroupValue>();

    @Input() public labelField: string = 'label';


    private _value: any = null;
    @Input()
    public get value(): any {
        return this._value;
    }

    public set value(newValue: any) {
        if (newValue && this._value != newValue) {
            this._value = newValue;
            this._updateTags();
        }
    }

    @Input() public color: string;

    private _updateTags(): void {
        if (this.data.length === 0) return;
        if (this._value) {
            this.data.forEach((tag, index) => {
                if (tag[this.labelField] === this._value[this.labelField]) {
                    this.data.splice(index, 1);
                    let arr = [];
                    this.data.forEach((item) => {
                        arr.push(item);
                    });
                    this.data = arr;
                    this.dataChange.emit(this._data);
                }
            });
        }
    }

    ngOnInit() {

    }
}

@Component({
    selector: 'rdk-tag',
    templateUrl: 'tag.html',
    styleUrls: ['tag.scss'],
    host: {
        '[style.width]': 'width',
        '[style.height]': 'height',
        '[style.line-height]': 'height',
        '[style.background]': 'color',
        '[style.border-color]': 'color',
        '[class.rdk-tag-close]': '_closable',
        '[class.rdk-tag-color]': '!!color',
        '[@AnimationDestroy]': '_state',
        '(@AnimationDestroy.done)': '_animationDone($event)',
    },
    animations: [
        AnimationDestroy
    ]
})
export class RdkTag extends AbstractRDKComponent implements OnInit {
    @Input() public tagItem: any;

    @Input() public color: string;

    private _closable: boolean;
    @Input()
    public get closable(): boolean {
        return this._closable;
    };

    public set closable(value: boolean) {
        this._closable = value === undefined ? true : value;
    }

    private _state: string;
    private _tagGroup: RdkTagGroup;

    constructor(@Optional() tagGroup: RdkTagGroup,
                private _renderer: Renderer2,
                private _elementRef: ElementRef) {
        super();
        this._tagGroup = tagGroup;

    }

    @Output() public close = new EventEmitter<RdkTag>();

    private _close(event) {
        event.preventDefault();
        event.stopPropagation();
        this._state = 'inactive';
        this.close.emit(this);
    }

    @Output() public select = new EventEmitter<RdkTag>();

    private _select() {
        this.select.emit(this);
    }

    private _animationDone($event) {
        if ($event.toState === 'inactive') {
            if (this._tagGroup) {
                this._tagGroup.value = this.tagItem;
            } else {
                this._renderer.parentNode(this._elementRef.nativeElement).removeChild(this._elementRef.nativeElement);
            }
        }
    }

    ngOnInit() {
        this.basicClass && this._renderer.addClass(this._elementRef.nativeElement, this.basicClass);
    }

}


@NgModule({
    imports: [CommonModule],
    declarations: [RdkTag, RdkTagGroup],
    exports: [RdkTag, RdkTagGroup]
})
export class RdkTagModule {

}
