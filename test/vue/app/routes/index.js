import Demo from '../views/Demo';
import Home from '../views/Home';
import JSX from '../views/JSX';
import Supplement from '../views/Supplement';
import Shareholder from '../views/Shareholder';

export default [{
  path: '/',
  component: Demo,
  children: [{
    path: '',
    component: Home
  }, {
    path: 'jsx',
    name: 'JSX',
    component: JSX
  }, {
    path: "supplement",
    name: "Supplement",
    component: Supplement
  }]
}, {
  path: "/shareholder",
  name: "Shareholder",
  component: Shareholder
}];
