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
      'npm:': 'https://unpkg.com/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      'app': 'app',

      // angular bundles
      '@angular/animations':                  'npm:@angular/animations@5.0.2/bundles/animations.umd.js',
      '@angular/animations/browser':          'npm:@angular/animations@5.0.2/bundles/animations-browser.umd.js',
      '@angular/core':                        'npm:@angular/core@5.0.2/bundles/core.umd.js',
      '@angular/common':                      'npm:@angular/common@5.0.2/bundles/common.umd.js',
      '@angular/common/http':                 'npm:@angular/common@5.0.2/bundles/common-http.umd.min.js',
      '@angular/compiler':                    'npm:@angular/compiler@5.0.2/bundles/compiler.umd.js',
      '@angular/platform-browser':            'npm:@angular/platform-browser@5.0.2/bundles/platform-browser.umd.js',
      '@angular/platform-browser/animations': 'npm:@angular/platform-browser@5.0.2/bundles/platform-browser-animations.umd.js',
      '@angular/platform-browser-dynamic':    'npm:@angular/platform-browser-dynamic@5.0.2/bundles/platform-browser-dynamic.umd.js',
      '@angular/router':                      'npm:@angular/router@5.0.2/bundles/router.umd.js',
      '@angular/router/upgrade':              'npm:@angular/router@5.0.2/bundles/router-upgrade.umd.js',
      '@angular/forms':                       'npm:@angular/forms@5.0.2/bundles/forms.umd.js',
      '@angular/upgrade':                     'npm:@angular/upgrade@5.0.2/bundles/upgrade.umd.js',
      '@angular/upgrade/static':              'npm:@angular/upgrade@5.0.2/bundles/upgrade-static.umd.js',

      'rxjs':                       'npm:rxjs@5.5.0',
      'rxjs/operators':             'npm:rxjs@5.5.0/operators/index.js',
      'ts':                         'npm:plugin-typescript@5.2.7/lib/plugin.js',
      'typescript':                 'npm:typescript@2.4.2/lib/typescript.js',
      'tslib':                      'npm:tslib@1.7.1/tslib.es6.js',
      'ngx-perfect-scrollbar':      'npm:ngx-perfect-scrollbar@5.0.5/dist/ngx-perfect-scrollbar.js',
      'perfect-scrollbar':          'npm:perfect-scrollbar@1.2.0/dist/perfect-scrollbar.esm.js',
      'resize-observer-polyfill':   'npm:resize-observer-polyfill@1.5.0/dist/ResizeObserver.es.js',
      "@ngx-translate/core":        'npm:@ngx-translate/core@8.0.0',
      "echarts":                    'npm:echarts@3.5.2/dist/echarts.js',
      '@rdkmaster/jigsaw':          'npm:@rdkmaster/jigsaw@next'
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
