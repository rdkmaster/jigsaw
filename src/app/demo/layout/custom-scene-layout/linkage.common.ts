import {JigsawEditableBox} from "jigsaw/component/box/editable-box";
import {EventEmitter} from "@angular/core";
import {Subscription} from "rxjs/Subscription";
import {IEmittable} from "jigsaw/core/data/component-data";

export class EmittableComponent implements IEmittable {
    public box: JigsawEditableBox;

    private _emitterCipher: string;

    public get emitterCipher(): string {
        return this._emitterCipher;
    }

    public set emitterCipher(value: string) {
        this._emitterCipher = value;
        if (!this.box) return;
        const emitterInput = this.box.data.componentMetaDataList[0].inputs
            .find(input => input.property == 'emitterCipher');
        if (emitterInput) {
            emitterInput.default = value;
        } else {
            this.box.data.componentMetaDataList[0].inputs.push({
                property: 'emitterCipher',
                default: value
            })
        }
    }

    private _emitter = new EventEmitter<any>();

    public emit(value?: any): void {
        this._emitter.emit(value);
    }

    public subscribe(callback?: (value: any) => void): Subscription {
        return this._emitter.subscribe(callback);
    }

    public unsubscribe() {
        this._emitter.unsubscribe();
    }
}

export class SubscribableComponent {
    public box: JigsawEditableBox;

    private _subscriberCipher: string;

    public get subscriberCipher(): string {
        return this._subscriberCipher;
    }

    public set subscriberCipher(value: string) {
        this._subscriberCipher = value;
        if (!this.box) return;
        const subscriberInput = this.box.data.componentMetaDataList[0].inputs
            .find(input => input.property == 'subscriberCipher');
        if (subscriberInput) {
            subscriberInput.default = value;
        } else {
            this.box.data.componentMetaDataList[0].inputs.push({
                property: 'subscriberCipher',
                default: value
            })
        }
    }

    public message: string;
}
