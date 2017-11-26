(() => {
    let posts = [];
    let pages = {
        posts: document.querySelector('#posts'),
        about: document.querySelector('#about'),
        resume: document.querySelector('#resume')
    };

    openPage = (id) => {
        $('.page').hide();
        $(`#${id}`).show();
    };
    loadPosts = () => {
        // GET POSTS FROM GITHUB
        
        if (posts.length === 0) {
            $(pages.posts).addClass('no-posts');
        } else {
            $(pages.posts).removeClass('no-posts');
        }
    };
    $('a.pagination').on('click', (e) => {
        openPage($(e.currentTarget).data('page'));
        e.preventDefault();
    });

    openPage('posts');
    loadPosts();
})();