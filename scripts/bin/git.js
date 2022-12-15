/* eslint-disable @typescript-eslint/no-var-requires */

const { writeFileSync } = require('fs');
const { execSync } = require('child_process');

const { ROOT_PATH } = require('../helper');

const GIT_MODULES_FILE = `${ROOT_PATH}/.gitmodules`;

const externalModules = [
  { name: 'petals', user: 'ourai', repo: 'petals' },
  { name: 'petals-basic', user: 'petals-ui', repo: 'basic' },
  { name: 'kokiri-core', user: 'kokiri-ui', repo: 'core' },
  { name: 'kokiri', user: 'kokiri-ui', repo: 'kokiri' },
  { name: 'kokiri-el', user: 'kokiri-ui', repo: 'adapter-element-ui' },
  { name: 'handie-core', user: 'handiejs', repo: 'runtime-core' },
];

function getGitRepoUrl({ user, repo }, via) {
  return via === 'ssh'
    ? `git@github.com:${user}/${repo}.git`
    : `https://github.com/${user}/${repo}.git`;
}

function generateGitModulesFile(via = 'https') {
  const segments = externalModules.map(
    m => `[submodule "${m.name}"]\n\tpath = external/${m.name}\n\turl = ${getGitRepoUrl(m, via)}`,
  );

  execSync(`rm -rf ${GIT_MODULES_FILE} && touch ${GIT_MODULES_FILE}`, { stdio: 'inherit' });
  writeFileSync(GIT_MODULES_FILE, segments.join('\n'));
}

function initGitModulesFile(via = 'https') {
  generateGitModulesFile(via);
  execSync(`git submodule update --init --recursive`, { stdio: 'inherit' });
}

function execute(subCmd, ...args) {
  if (subCmd === 'gen') {
    if (args[0] === 'modules') {
      generateGitModulesFile(args[1]);
    }
  } else if (subCmd === 'init') {
    if (args[0] === 'modules') {
      initGitModulesFile(args[1]);
    }
  }
}

module.exports = { execute };
