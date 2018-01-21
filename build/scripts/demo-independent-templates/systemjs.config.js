(function (global) {
  System.config({
    // DEMO ONLY! REAL CODE SHOULD NOT TRANSPILE IN THE BROWSER
    transpiler: 'ts',
    typescriptOptions: {
      // Copy of compiler options in standard tsconfig.json
      "target": "es5",
      "module": "commonjs",
      "moduleResolution": "node",
      "sourceMap": true,
      "emitDecoratorMetadata": true,
      "experimentalDecorators": true,
      "lib": ["es2015", "dom"],
      "noImplicitAny": true,
      "suppressImplicitAnyIndexErrors": true
    },
    meta: {
      'typescript': {
        "exports": "ts"
      }
    },
    paths: {
      // paths serve as alias
      'npm:': '/node_modules/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      'app': 'app',

      // angular bundles
      '@angular/animations':                  'npm:@angular/animations/bundles/animations.umd.js',
      '@angular/animations/browser':          'npm:@angular/animations/bundles/animations-browser.umd.js',
      '@angular/core':                        'npm:@angular/core/bundles/core.umd.js',
      '@angular/common':                      'npm:@angular/common/bundles/common.umd.js',
      '@angular/common/http':                 'npm:@angular/common/bundles/common-http.umd.min.js',
      '@angular/compiler':                    'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser':            'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser/animations': 'npm:@angular/platform-browser/bundles/platform-browser-animations.umd.js',
      '@angular/platform-browser-dynamic':    'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/router':                      'npm:@angular/router/bundles/router.umd.js',
      '@angular/router/upgrade':              'npm:@angular/router/bundles/router-upgrade.umd.js',
      '@angular/forms':                       'npm:@angular/forms/bundles/forms.umd.js',
      '@angular/upgrade':                     'npm:@angular/upgrade/bundles/upgrade.umd.js',
      '@angular/upgrade/static':              'npm:@angular/upgrade/bundles/upgrade-static.umd.js',

      'rxjs':                       'npm:rxjs',
      'rxjs/operators':             'npm:rxjs/operators/index.js',
      'ts':                         'npm:plugin-typescript/lib/plugin.js',
      'typescript':                 'npm:typescript/lib/typescript.js',
      'tslib':                      'npm:tslib/tslib.es6.js',
      'ngx-perfect-scrollbar':      'npm:ngx-perfect-scrollbar/dist/ngx-perfect-scrollbar.js',
      'perfect-scrollbar':          'npm:perfect-scrollbar/dist/js/perfect-scrollbar.min.js',
      'resize-observer-polyfill':   'npm:resize-observer-polyfill/dist/ResizeObserver.es.js',
      "@ngx-translate/core":        'npm:@ngx-translate/core',
      "echarts":                    'npm:echarts/dist/echarts.js',
      '@rdkmaster/jigsaw':          'npm:@rdkmaster/jigsaw/bundles/jigsaw.umd.js'
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        main: './main.ts',
        defaultExtension: 'ts',
        meta: {
          './*.ts': {
            loader: 'systemjs-angular-loader.js'
          }
        }
      },
      rxjs: {
        defaultExtension: 'js'
      }
    }
  });

})(this);
