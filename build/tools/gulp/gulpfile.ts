import {createBuildTask} from './create-build-task';

import './tasks/clean';
import './tasks/default';

createBuildTask('jigsaw');
createBuildTask('jigsaw-mobile');

import './tasks/publish';

import './tasks/ensure-url-matches-path'
import './tasks/generate-demo-info'
