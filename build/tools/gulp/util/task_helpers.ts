import * as child_process from 'child_process';
import * as fs from 'fs';
import * as gulp from 'gulp';
import * as path from 'path';
import {yellow} from 'chalk';
import {buildConfig} from '../tasks/build-config';

/* Those imports lack typings. */
const gulpClean = require('gulp-clean');
const gulpSass = require('gulp-dart-sass');
const gulpIf = require('gulp-if');
const gulpCleanCss = require('gulp-clean-css');
// There are no type definitions available for these imports.
const resolveBin = require('resolve-bin');

const {projectDir} = buildConfig;

/** If the string passed in is a glob, returns it, otherwise append '**\/*' to it. */
function _globify(maybeGlob: string, suffix = '**/*') {
    if (maybeGlob.indexOf('*') != -1) {
        return maybeGlob;
    }
    try {
        const stat = fs.statSync(maybeGlob);
        if (stat.isFile()) {
            return maybeGlob;
        }
    } catch (e) {
    }
    return path.join(maybeGlob, suffix);
}


/** Creates a task that runs the TypeScript compiler */
export function tsBuildTask(tsConfigPath: string) {
    return execNodeTask('typescript', 'tsc', ['-p', tsConfigPath]);
}

/** Creates a task that runs the Angular Compiler CLI. */
export function ngcBuildTask(tsConfigPath: string) {
    return execNodeTask('@angular/compiler-cli', 'ngc', ['-p', tsConfigPath]);
}

/** Create a SASS Build Task. */
export function sassBuildTask(dest: string, root: string, minify = false) {
    return () => {
        return gulp.src(_globify(root, '**/*.scss'))
            .pipe(gulpSass().on('error', gulpSass.logError))
            .pipe(gulpIf(minify, gulpCleanCss()))
            .pipe(gulp.dest(dest));
    };
}


/** Options that can be passed to execTask or execNodeTask. */
export interface ExecTaskOptions {
    // Whether STDOUT and STDERR messages should be printed.
    silent?: boolean;
    // Whether STDOUT messages should be printed.
    silentStdout?: boolean;
    // If an error happens, this will replace the standard error.
    errMessage?: string;
    // Environment variables being passed to the child process.
    env?: any;
}

/** Create a task that executes a binary as if from the command line. */
export function execTask(binPath: string, args: string[], options: ExecTaskOptions = {}) {
    return (done: (error?: Error | null) => void) => {
        const env = Object.assign({}, process.env, options.env);
        const childProcess = child_process.spawn(binPath, args, {env});

        if (!options.silentStdout && !options.silent) {
            childProcess.stdout.on('data', (data: string) => process.stdout.write(data));
        }

        if (!options.silent) {
            childProcess.stderr.on('data', (data: string) => process.stderr.write(data));
        }

        childProcess.on('close', (code: number) => {
            if (code != 0) {
                if (options.errMessage === undefined) {
                    done(new Error('Process failed with code ' + code));
                } else {
                    done(new Error(options.errMessage));
                }
            } else {
                done();
            }
        });
    };
}

/**
 * Create a task that executes an NPM Bin, by resolving the binary path then executing it. These are
 * binaries that are normally in the `./node_modules/.bin` directory, but their name might differ
 * from the package. Examples are typescript, ngc and gulp itself.
 */
export function execNodeTask(packageName: string, executable: string | string[], args?: string[],
                             options: ExecTaskOptions = {}) {
    if (!args) {
        args = <string[]>executable;
        executable = undefined;
    }

    return (done: (err: any) => void) => {
        resolveBin(packageName, {executable: executable}, (err: any, binPath: string) => {
            if (err) {
                done(err);
            } else {
                // Execute the node binary within a new child process using spawn.
                // The binary needs to be `node` because on Windows the shell cannot determine the correct
                // interpreter from the shebang.
                execTask('node', [binPath].concat(args), options)(done);
            }
        });
    };
}


/** Copy files from a glob to a destination. */
export function copyTask(srcGlobOrDir: string | string[], outRoot: string) {
    if (typeof srcGlobOrDir === 'string') {
        return () => gulp.src(_globify(srcGlobOrDir)).pipe(gulp.dest(outRoot));
    } else {
        return () => gulp.src(srcGlobOrDir.map(name => _globify(name))).pipe(gulp.dest(outRoot));
    }
}


/** Delete files. */
export function cleanTask(glob: string) {
    return () => gulp.src(glob, {read: false, allowEmpty: true}).pipe(gulpClean(null));
}


