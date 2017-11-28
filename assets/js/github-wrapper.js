class GitHubWrapper {
    constructor(owner, repo) {
        this._owner = owner || '';
        this._repo = repo || '';
        this._url = `https://api.github.com/repos/${this._owner}/${this._repo}/contents`;
    }

    getReadMeFile() {
        return new Promise((resolve, reject) => {
            let filePromises = [];
            let url = this._url.replace('/contents', '/readme');

            $.get(url, {}, (response) => {
                if (!response) resolve(null);

                let mdUrls = [response.download_url];

                if (!mdUrls || mdUrls.length <= 0) resolve(null);

                mdUrls.forEach((m) => filePromises.push(this.getMDFileContent(m)));

                if (!filePromises || filePromises.length <= 0) resolve(null);

                Promise.all(filePromises).then((result) => {
                    resolve(result);
                });
            });
        })
    }

    getMDFilesInFoler(folder) {
        return new Promise((resolve, reject) => {
            let filePromises = [];
            let url = `${this._url}/${folder}`;

            $.get(url, {}, (response) => {
                if (!response) resolve(null);

                let mdUrls = response.map((r) => {
                    if (r.name.indexOf('.md') !== -1) {
                        return r.download_url;
                    }
                });

                if (!mdUrls || mdUrls.length <= 0) resolve(null);

                mdUrls.forEach((m) => filePromises.push(this.getMDFileContent(m)));

                if (!filePromises || filePromises.length <= 0) resolve(null);

                Promise.all(filePromises).then((result) => {
                    resolve(result);
                });
            });
        })
    }

    getMDFileContent(url) {
        return new Promise((resolve, reject) => {
            if (!url) reject(null);

            $.get(url, {}, (response) => {
                if (!response) reject(null);

                resolve(response);
            });
        });
    }
}