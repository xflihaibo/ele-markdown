const cmd = window.require('node-cmd');
const chalk = window.require('chalk');

export const getPath = () => {
    let res = global.Shell.pwd();
    console.log('🍎🍎5', global.Shell.exec('node -v'));
    global.Shell.echo('🍎🍎6', global.Shell.pwd()); //cmd.run('node -v')
    console.log('🍎🍎7', res);
    cmd.run('node -v', (error, data, stderr) => {
        if (!error) {
            console.log(chalk.blue(data));
        } else {
            console.log(chalk.red(error));
        }
    });
    cmd.run('npm -v', (error, data, stderr) => {
        if (!error) {
            console.log(data);
        } else {
            console.log(chalk.red(error));
        }
    });
    cmd.run('yarn -v', (error, data, stderr) => {
        if (!error) {
            console.log(data);
        } else {
            console.log(chalk.red(error));
        }
    });
    // console.log(global.Shell.exec('node -v'));
    // console.log(global.Shell.exec('npm -v'));
    global.Shell.echo('🍎🍎hello world');

    return res;
};
