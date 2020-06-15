import {ChangeDetectorRef} from '@angular/core';

/**
 * 属性装饰器，用于将input属性，自动改造为getter/setter方式，并在setter中，增加 ChangeDetectorRef.markForCheck() 的调用
 * 以确保视图可以得到及时更新
 */
export function GenerateGetterSetter(): PropertyDecorator {

    return (target: Object, propertyName: string) => {
        const className = target.constructor?.name;
        // 创建私有属性
        const privatePropName = `_${propertyName}`;
        // 判断是否设置过该值，防止重复操作
        if (Object.prototype.hasOwnProperty.call(target, privatePropName)) {
            console.warn(`The property "${privatePropName}" in ${className} is already exist, it will be overwrote by GenerateGetterSetter decorator.`);
        }

        return {
            get(): any {
                return this[privatePropName];
            },
            set(value: any): void {
                if (this[privatePropName] == value) {
                    return;
                }
                this[privatePropName] = value;
                if (!this._injector) {
                    console.warn(`There has no DI for 'Injector' in ${className}.`);
                    return;
                }
                this._injector.get(ChangeDetectorRef).markForCheck();
            }
        };
    };

}
