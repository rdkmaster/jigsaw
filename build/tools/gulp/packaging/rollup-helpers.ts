import {buildConfig} from './build-config';

// There are no type definitions available for these imports.
const rollup = require('rollup');
const rollupNodeResolutionPlugin = require('rollup-plugin-node-resolve');

const ROLLUP_GLOBALS = {
    // Import tslib rather than having TypeScript output its helpers multiple times.
    // See https://github.com/Microsoft/tslib
    'tslib': 'tslib',

    // Angular dependencies
    '@angular/animations': 'ng.animations',
    '@angular/core': 'ng.core',
    '@angular/common': 'ng.common',
    '@angular/forms': 'ng.forms',
    '@angular/http': 'ng.http',
    '@angular/common/http': 'ng.http',
    '@angular/router': 'ng.router',
    '@angular/platform-browser': 'ng.platformBrowser',
    '@angular/platform-browser-dynamic': 'ng.platformBrowserDynamic',
    '@angular/platform-browser/animations': 'ng.platformBrowser.animations',

    // Local Angular packages inside of Jigsaw.
    '@rdkmaster/jigsaw': 'ng.jigsaw',

    // Rxjs dependencies
    'rxjs/BehaviorSubject': 'Rx',
    'rxjs/Observable': 'Rx',
    'rxjs/Subject': 'Rx',
    'rxjs/Subscription': 'Rx',
    'rxjs/add/observable/combineLatest': 'Rx.Observable',
    'rxjs/add/observable/forkJoin': 'Rx.Observable',
    'rxjs/add/observable/fromEvent': 'Rx.Observable',
    'rxjs/add/observable/merge': 'Rx.Observable',
    'rxjs/add/observable/of': 'Rx.Observable',
    'rxjs/add/observable/throw': 'Rx.Observable',
    'rxjs/add/operator/auditTime': 'Rx.Observable.prototype',
    'rxjs/add/operator/catch': 'Rx.Observable.prototype',
    'rxjs/add/operator/debounceTime': 'Rx.Observable.prototype',
    'rxjs/add/operator/do': 'Rx.Observable.prototype',
    'rxjs/add/operator/filter': 'Rx.Observable.prototype',
    'rxjs/add/operator/finally': 'Rx.Observable.prototype',
    'rxjs/add/operator/first': 'Rx.Observable.prototype',
    'rxjs/add/operator/let': 'Rx.Observable.prototype',
    'rxjs/add/operator/map': 'Rx.Observable.prototype',
    'rxjs/add/operator/share': 'Rx.Observable.prototype',
    'rxjs/add/operator/startWith': 'Rx.Observable.prototype',
    'rxjs/add/operator/switchMap': 'Rx.Observable.prototype',
    'rxjs/add/operator/takeUntil': 'Rx.Observable.prototype',
    'rxjs/add/operator/toPromise': 'Rx.Observable.prototype',

    'rxjs/observable/combineLatest': 'Rx.Observable',
    'rxjs/observable/forkJoin': 'Rx.Observable',
    'rxjs/observable/fromEvent': 'Rx.Observable',
    'rxjs/observable/merge': 'Rx.Observable',
    'rxjs/observable/of': 'Rx.Observable',
    'rxjs/observable/throw': 'Rx.Observable',
    'rxjs/operator/auditTime': 'Rx.Observable.prototype',
    'rxjs/operator/catch': 'Rx.Observable.prototype',
    'rxjs/operator/debounceTime': 'Rx.Observable.prototype',
    'rxjs/operator/do': 'Rx.Observable.prototype',
    'rxjs/operator/filter': 'Rx.Observable.prototype',
    'rxjs/operator/finally': 'Rx.Observable.prototype',
    'rxjs/operator/first': 'Rx.Observable.prototype',
    'rxjs/operator/let': 'Rx.Observable.prototype',
    'rxjs/operator/map': 'Rx.Observable.prototype',
    'rxjs/operator/share': 'Rx.Observable.prototype',
    'rxjs/operator/startWith': 'Rx.Observable.prototype',
    'rxjs/operator/switchMap': 'Rx.Observable.prototype',
    'rxjs/operator/takeUntil': 'Rx.Observable.prototype',
    'rxjs/operator/toPromise': 'Rx.Observable.prototype',
    'rxjs/operator/concatMap': 'Rx.Observable.concatMap',

    //@ngx-translate
    '@ngx-translate': 'ngx.translate',
    '@ngx-translate/core/index': 'ngx.translate',
    '@ngx-translate/http-loader/index': 'ngx.translate',

    //echarts
    'echarts': 'echarts',

    //ngx-perfect-scrollbar
    'ngx-perfect-scrollbar': 'ngx.perfect-scrollbar'
};

export type BundleConfig = {
    entry: string;
    dest: string;
    format: string;
    moduleName: string;
};

/** Creates a rollup bundle of a specified JavaScript file.*/
export function createRollupBundle(config: BundleConfig): Promise<any> {
    const bundleOptions: any = {
        context: 'this',
        external: Object.keys(ROLLUP_GLOBALS),
        entry: config.entry,
    };

    const writeOptions = {
        // Keep the moduleId empty because we don't want to force developers to a specific moduleId.
        moduleId: '',
        moduleName: config.moduleName || 'ng.jigsaw',
        banner: buildConfig.licenseBanner,
        format: config.format,
        dest: config.dest,
        globals: ROLLUP_GLOBALS,
        sourceMap: true
    };

    // When creating a UMD, we want to exclude tslib from the `external` bundle option so that it
    // is inlined into the bundle.
    if (config.format === 'umd') {
        bundleOptions.plugins = [rollupNodeResolutionPlugin()];

        const external = Object.keys(ROLLUP_GLOBALS);
        external.splice(external.indexOf('tslib'), 1);
        bundleOptions.external = external;
    }

    return rollup.rollup(bundleOptions).then((bundle: any) => bundle.write(writeOptions));
}
