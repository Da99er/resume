import * as React from 'react';
import { hydrate } from 'react-dom';

import 'src/assets/index.html';
import 'src/assets/favicon.ico';

import App from 'src/components/App';

hydrate(<App />, document.getElementById('root'));
