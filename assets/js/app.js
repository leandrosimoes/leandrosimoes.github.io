;(function () {
    //jQuery is required to run this code
    $(document).ready(function () {
        console.log('ready');

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

        //setTimeout(function () {
            var video = $('.fillWidth')[0];
            if (video.canPlayType) {
                console.log('canplay');

                $(video).toggleClass('hidden');
                $('.poster').toggleClass('hidden');

                var source1 = document.createElement('source');
                var source2 = document.createElement('source');
                var source3 = document.createElement('source');

                source1.setAttribute('type', 'video/mp4');
                source1.setAttribute('src', '/assets/videos/cover.mp4?' + new Date().getTime()); 

                source2.setAttribute('type', 'video/webm'); 
                source2.setAttribute('src', '/assets/videos/cover.webm?' + new Date().getTime()); 

                source3.setAttribute('src', '/assets/videos/cover.mp4?' + new Date().getTime());

                video.appendChild(source1);
                video.appendChild(source2);
                video.appendChild(source3);

                setInterval(function () {
                    console.log('play');

                    video.load();
                    video.play();
                }, 5000);
            }
        //}, 1000);
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