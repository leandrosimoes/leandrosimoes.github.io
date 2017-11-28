(() => {
    let posts = [];
    let resumes = [];
    let pages = {
        posts: document.querySelector('#posts'),
        readPost: document.querySelector('#read-post'),
        about: document.querySelector('#about'),
        resume: document.querySelector('#resume')
    };

    openPage = (id) => {
        $('.page').hide();
        $(`#${id}`).show();
    };
    readPost = (e) => {
        $(pages.readPost)[0].innerHTML = $(e.currentTarget.parentElement).data('content');
        openPage('read-post');
    };
    loadResume = () => {
        return new Promise((resolve, reject) => {
            let gitHubWrapper = new GitHubWrapper('leandrosimoes', 'resume');
            gitHubWrapper
                .getReadMeFile()
                .then((result) => {
                    if (!!result && result.length > 0) {
                        result.map((r) => resumes.push(new Resume(r)));
                    }

                    resolve(resumes);
                }).catch((err) => {
                    console.log(err);
                    resolve([]);
                });
        });
    };
    loadPosts = () => {
        $(pages.posts).addClass('loading');

        return new Promise((resolve, reject) => {
            let gitHubWrapper = new GitHubWrapper('leandrosimoes', 'leandrosimoes.github.io');
            gitHubWrapper
                .getMDFilesInFoler('assets/posts')
                .then((result) => {
                    if (!!result && result.length > 0) {
                        result.map((r) => posts.push(new Post(r)));
                    }

                    resolve(posts);
                }).catch((err) => {
                    console.log(err);
                    resolve([]);
                });
        });
    };
    $('a.pagination').on('click', (e) => {
        openPage($(e.currentTarget).data('page'));
        e.preventDefault();
    });
    $('#btn-print').on('click', (e) => {
        window.print();
    });
    loadResume()
        .then((result) => {
            if (result.length <= 0) {
                $($(pages.resume)[0].querySelector('.resume-area')).html('');
            } else {
                result.forEach((r) => {
                    $($(pages.resume)[0].querySelector('.resume-area'))[0].appendChild(r.getHtmlNode());
                });
            }
        });
    loadPosts()
        .then((result) => {
            if (result.length <= 0) {
                $(pages.posts).addClass('no-posts');
                $($(pages.posts)[0].querySelector('.articles-area')).html('');
            } else {
                result = result.sort((a, b) => { return a.postDate < b.postDate });
                result.forEach((p) => {
                    $(pages.posts)[0].querySelector('.articles-area').appendChild(p.getPostThumbnail());
                });
                $(pages.posts).removeClass('no-posts');

                setTimeout(() => { $('.read-post-link').on('click', readPost); }, 100);
            }

            $(pages.posts).removeClass('loading');
        });

    openPage('posts');
})();