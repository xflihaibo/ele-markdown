const fs = window.require('fs').promises;
const path = window.require('path');
export const pathname = name => path.join(__dirname, name);
// console.log(path.join(__dirname, 'helloword.md'));
export const fsHelper = {
    rname: (oldname, newname) => {
        return fs.rename(oldname, newname);
    },
    write: (path, data) => {
        return fs.writeFile(path, data, {encoding: 'utf8'});
    },
    read: path => {
        return fs.readFile(path, {encoding: 'utf8'});
    },
    delete: path => {
        return fs.unlink(path);
    },
    haveBol: path => {
        return fs.access(path).then(
            r => {
                return true;
            },
            e => {
                return false;
            }
        );

        // return fs.access(path);
    }
};

// fsHelper.write(pathname, '# hello world').then(e => {
//     console.log('success', e);
// });

// fsHelper.read(pathname).then(e => {
//     console.log(e);
// });

// fsHelper.delete(pathname).then(e => {
//     console.log(e);
// });

// fsHelper.rname(pathname, path.join(__dirname, 'readme.md')).then(e => {
//     console.log(e);
// });
