import Vue from 'vue';
import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';

// require all components in the current directory and subdirectories
const requireComponent = require.context('../components/_global', true, /Base[A-Z]\w+\.(vue|js)$/);

requireComponent.keys().forEach(fileName => {
  // get the component's configuration
  const componentConfig = requireComponent(fileName);

  const fn = fileName
    .split('/')
    .pop()
    .replace(/\.\w+$/, '');

  const componentName = upperFirst(camelCase(fn));

  Vue.component(componentName, componentConfig.default || componentConfig);
});
