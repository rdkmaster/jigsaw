import * as child_process from 'child_process';
import * as fs from 'fs';
import * as gulp from 'gulp';
import * as path from 'path';

/* Those imports lack typings. */
const gulpClean = require('gulp-clean');
const gulpRunSequence = require('run-sequence');

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
    return (done: (err?: string) => void) => {
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
                    done('Process failed with code ' + code);
                } else {
                    done(options.errMessage);
                }
            } else {
                done();
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
    return () => gulp.src(glob, {read: false}).pipe(gulpClean(null));
}

/** Create a task that's a sequence of other tasks. */
export function sequenceTask(...args: any[]) {
    return (done: any) => {
        gulpRunSequence(
            ...args,
            done
        );
    };
}

export function runTasks(tasks: string[]) {
    return new Promise(resolve => gulpRunSequence(...tasks, resolve))
}
