import {createPackageBuildTasks} from './packaging/build-tasks-gulp';
import {createReleaseTasks} from './tasks/jigsaw-release';
// Create gulp tasks to build the different packages in the project.
createPackageBuildTasks('jigsaw');
createPackageBuildTasks('jigsaw-mobile');

import './tasks/clean';
import './tasks/default';
//import './tasks/lint';
import './tasks/publish';
//import './tasks/aot';
createReleaseTasks('jigsaw');
createReleaseTasks('jigsaw-mobile');
// import './tasks/jigsaw-labs-release';
import './tasks/validate-release';

import './tasks/ensure-url-matches-path'
import './tasks/generate-demo-info'
