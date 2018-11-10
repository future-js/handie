import { isFunction, mixin, each } from '../common/helper';
import { getDefaults } from '../storage/helper';
import flexibleAdaptor from '../../adapters/flexible';
import { configureApplication, detectEnvironment, normalizeFeedback } from '../../plugins';

import { App } from '../../components/app';

const DEFAULT_APP_OPTIONS = {
    el: '#app',
    components: {
      App
    },
    template: '<App />'
  };
const DEFAULT_APP_SETTINGS = {};

each(['theme', 'behavior', 'flexible'], key => {
  DEFAULT_APP_SETTINGS[key] = getDefaults(key);
});

export function connect( Vue, opts ) {
  const settings = mixin(true, DEFAULT_APP_SETTINGS, opts.settings);
  const created = opts.created;

  delete opts.settings;

  if ( settings.flexible !== false ) {
    opts.created = function( ...args ) {
      flexibleAdaptor(settings.flexible);

      if ( isFunction(created) ) {
        created.apply(this, args);
      }
    }
  }

  each([
      [configureApplication, settings],
      [detectEnvironment],
      [normalizeFeedback]
    ], args => Vue.use(...args));

  return new Vue(mixin({}, DEFAULT_APP_OPTIONS, opts));
}
