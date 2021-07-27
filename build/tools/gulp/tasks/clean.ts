import {task} from 'gulp';
import {cleanTask, sequenceTask} from '../util/task_helpers';
import {buildConfig} from './build-config';


/** Deletes the dist/ directory. */
task('clean', sequenceTask(':clean:dist', ':clean:extraction'));

task(':clean:dist', cleanTask(buildConfig.outputDir));
task(':clean:extraction', cleanTask('src/jigsaw/common/core/theming/prebuilt/extraction/*.scss'));
