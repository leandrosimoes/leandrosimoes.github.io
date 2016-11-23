; (function () {
    window.addEventListener('load', function () {
        var video = document.querySelector('.fillWidth');
        var preloader = document.querySelector('.poster');

        function checkLoad() {
            if (video.readyState === 4) {
                $('.fillWidth').toggleClass('hidden');
                $('.poster').toggleClass('hidden');
                console.log('foi');
            } else {
                setTimeout(checkLoad, 100);
            }
        }

        checkLoad();
    }, false);

    //jQuery is required to run this code
    $(document).ready(function () {
        $('.fillWidth').toggleClass('hidden');
        $('.poster').toggleClass('hidden');

        scaleVideoContainer();

        initBannerVideoSize('.video-container .poster img');
        initBannerVideoSize('.video-container .filter');
        initBannerVideoSize('.video-container video');

        $(window).on('resize', function () {
            scaleVideoContainer();
            scaleBannerVideoSize('.video-container .poster img');
            scaleBannerVideoSize('.video-container .filter');
            scaleBannerVideoSize('.video-container video');
        });

        setTimeout(function () {
            $('.fillWidth source')[0].src = $('.fillWidth source')[0].src + '?' + new Date().getTime();
            $('.fillWidth source')[1].src = $('.fillWidth source')[0].src + '?' + new Date().getTime();
        }, 1000);
    });

    function scaleVideoContainer() {

        var height = $(window).height() + 5;
        var unitHeight = parseInt(height) + 'px';
        $('.homepage-hero-module').css('height', unitHeight);

    }

    function initBannerVideoSize(element) {

        $(element).each(function () {
            $(this).data('height', $(this).height());
            $(this).data('width', $(this).width());
        });

        scaleBannerVideoSize(element);

    }

    function scaleBannerVideoSize(element) {

        var windowWidth = $(window).width(),
        windowHeight = $(window).height() + 5,
        videoWidth,
        videoHeight;

        $(element).each(function () {
            var videoAspectRatio = $(this).data('height') / $(this).data('width');

            $(this).width(windowWidth);

            if (windowWidth < 1000) {
                videoHeight = windowHeight;
                videoWidth = videoHeight / videoAspectRatio;
                $(this).css({ 'margin-top': 0, 'margin-left': -(videoWidth - windowWidth) / 2 + 'px' });

                $(this).width(videoWidth).height(videoHeight);
            }

            $('.homepage-hero-module .video-container video').addClass('fadeIn animated');

        });
    }
})();