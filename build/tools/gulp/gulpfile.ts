import {createTask} from './tasks/create-task';

import './tasks/clean';
import './tasks/default';

import './tasks/publish';

import './tasks/ensure-url-matches-path';
import './tasks/build-formly';
import './tasks/generate-demo-info';

createTask('jigsaw');
createTask('jigsaw-mobile');
