import fs from 'fs';

let pathCache = {};

export function readPath(path) {
    if (!pathCache[path]) {
        pathCache[path] = new Promise((resolve, reject) => {
            fs.readFile(path, 'utf8', (err, content) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(content);
                }
            });
        });
    }
    return pathCache[path];
}

export function clearCache() {
    pathCache = {};
}
