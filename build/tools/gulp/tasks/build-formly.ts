import {task} from 'gulp';
import {join} from 'path';
import {buildConfig} from './build-config';
import {sequenceTask, copyTask, cleanTask, execTask} from '../util/task_helpers';

const node = process.platform === "win32" ? "node.exe" : "node";
const jigsawDir = join(buildConfig.projectDir, 'node_modules', '@rdkmaster', 'jigsaw');

task(':formly:clean', cleanTask(jigsawDir));
task(':formly:copy', copyTask(join(buildConfig.outputDir, '@rdkmaster', 'jigsaw'), jigsawDir));
task(':formly:build', execTask(node, ['--max_old_space_size=4096', './node_modules/@angular/cli/bin/ng', 'build', '--prod', '@ngx-formly/jigsaw']));


/**
 * Jigsaw适配ngx-formly的编译入口任务
 */
task('build:formly:clean', sequenceTask('build:jigsaw:clean', ':formly:clean', ':formly:copy', ':formly:build'));


