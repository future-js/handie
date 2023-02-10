/* eslint-disable @typescript-eslint/no-var-requires */

const { existsSync } = require('fs');
const { execSync } = require('child_process');

const { ROOT_PATH, DEPLOY_ROOT_PATH, getPkgPath } = require('../helper');
const { execute: toBuild } = require('./build');

const previewDirPath = `${DEPLOY_ROOT_PATH}/preview`;
const appDirPath = `${previewDirPath}/vue`;

function deploySite() {
  execSync('git pull origin master', { stdio: 'inherit', cwd: DEPLOY_ROOT_PATH });

  if (!existsSync(previewDirPath)) {
    execSync(`mkdir ${previewDirPath}`, { stdio: 'inherit' });
  }

  if (existsSync(appDirPath)) {
    execSync(`rm -rf ${appDirPath}`, { stdio: 'inherit' });
  }

  execSync(`mkdir ${appDirPath}`, { stdio: 'inherit' });
  execSync('npm run build', { stdio: 'inherit', cwd: ROOT_PATH });
  execSync(`cp -R ${ROOT_PATH}/dist/* ${appDirPath}`, { stdio: 'inherit' });

  execSync(
    [
      'touch .nojekyll',
      'git add -A',
      `git commit -m 'build(preview-vue): generate on ${new Date()}'`,
      'git push origin master',
    ].join(' && '),
    { stdio: 'inherit', cwd: DEPLOY_ROOT_PATH },
  );
}

function publishPackage(pkgName) {
  const pkgDirPath = getPkgPath(pkgName);

  if (existsSync(pkgDirPath)) {
    const { name } = require(`${pkgDirPath}/package.json`);

    execSync(
      `npm publish${name.startsWith('@') && name.startsWith('@handie') ? ' --access=public' : ''}`,
      { stdio: 'inherit', cwd: pkgDirPath },
    );
  }
}

function execute(subCmd = 'app', ...args) {
  if (subCmd === 'app') {
    deploySite();
  } else if (subCmd === 'pkg') {
    toBuild(subCmd, args[0]);
    publishPackage(args[0]);
  }
}

module.exports = { execute };
