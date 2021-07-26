import {ChangeDetectorRef} from '@angular/core';

/**
 * 检查装饰器所装饰的属性，是否本身就是 getter/setter
 */
const checkDescriptor = (target: Object, propertyName: string) => {
    let descriptor = Object.getOwnPropertyDescriptor(target, propertyName);
    if (!descriptor) {
        // 当前类中的该属性没有getter/setter方法，需要检查他的父类中，该属性是否是getter/getter方法
        let parentPrototype = Object.getPrototypeOf(target);
        if (parentPrototype) {
            descriptor = Object.getOwnPropertyDescriptor(parentPrototype, propertyName);
        }
        while (!descriptor && parentPrototype) {
            parentPrototype = Object.getPrototypeOf(parentPrototype);
            if (parentPrototype) {
                descriptor = Object.getOwnPropertyDescriptor(parentPrototype, propertyName);
            }
        }
    }
    if (descriptor && !descriptor.configurable) {
        throw new TypeError(`property ${propertyName} is not configurable`);
    }
    return {
        originalGetter: descriptor && descriptor.get,
        originalSetter: descriptor && descriptor.set,
    };
};

/**
 * 属性装饰器，用于将input属性，自动改造为getter/setter方式，并在setter中，增加 ChangeDetectorRef.markForCheck() 的调用
 * 以确保视图可以得到及时更新
 */
export function RequireMarkForCheck(): PropertyDecorator {

    return (target: Object, propertyName: string) => {
        const className = target.constructor?.name;
        // 创建私有属性
        const privatePropName = `__autoMFC_${propertyName}`;
        // 判断是否设置过该值，防止重复操作
        if (Object.prototype.hasOwnProperty.call(target, privatePropName)) {
            console.warn(`The property "${privatePropName}" in ${className} is already exist, it will be overwrote by AutoMarkForCheck decorator.`);
        }

        const {originalGetter, originalSetter} = checkDescriptor(target, propertyName);
        return {
            get(): any {
                return originalGetter ? originalGetter.call(this) : this[privatePropName];
            },
            set(value: any): void {
                if (originalSetter) {
                    // 调用原有的setter
                    originalSetter.call(this, value);
                } else {
                    if (this[privatePropName] === value) {
                        // 当前值跟设置的值相同，直接返回，不需要调用 MarkForCheck
                        return;
                    }
                    this[privatePropName] = value;
                }
                // 无论是原来就有的setter，还是装饰器生成的，都追加 MarkForCheck 的调用
                if (!this._injector) {
                    console.warn("There is no DI for 'Injector' in " + className +
                        ", maybe we access to the '_injector' member too early, we will try again later.");
                    return;
                }
                this._injector.get(ChangeDetectorRef).markForCheck();
            }
        };
    };

}
