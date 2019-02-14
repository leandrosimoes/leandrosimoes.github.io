;
(document => {
    const body = document.querySelector('body')
    const ageElement = document.querySelector('span.age')
    const daysElement = document.querySelector('.days')
    const hoursElement = document.querySelector('.hours')
    const minutesElement = document.querySelector('.minutes')
    const secondsElement = document.querySelector('.seconds')

    document.addEventListener('readystatechange', () => {
        if (document.readyState === 'complete') {
            function setAge() {
                const today = new Date();
                const birthDate = new Date(1985, 8, 6);
                const month = today.getMonth() - birthDate.getMonth();
                let age = today.getFullYear() - birthDate.getFullYear();

                age = (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) ? age - 1 : age;

                ageElement.innerHTML = age
            }

            function startCount() {
                let targetDate = new Date(2009, 0, 1);
                let onStart = () => {
                    document.querySelectorAll('.counter span').forEach(item => item.classList.add('show'))
                }
                let onTick = ({
                    days,
                    hours,
                    minutes,
                    seconds
                }) => {
                    daysElement.innerHTML = days;
                    hoursElement.innerHTML = hours;
                    minutesElement.innerHTML = minutes;
                    secondsElement.innerHTML = seconds;
                };
                let options = new LsCountupOptions({
                    targetDate,
                    onStart,
                    onTick
                });
                let countup = new LsCountup(options);

                countup.start();
                window.mycountup = countup;
            }

            setAge()
            startCount()

            body.classList.remove('loading')
        }
    })

    document.addEventListener('scroll', event => {
        const scrolled = window.pageYOffset;
        const background = document.querySelectorAll('.paralaxed-background')
        
        background.forEach(b => {
            const currentPositionY = b.offsetTop || 0;
            if (scrolled === 0) {
                b.style.backgroundPositionY = '0px'
            } else if (scrolled > b.offsetTop) {
                b.style.backgroundPositionY = `${(scrolled - currentPositionY) * 0.5}px`  
            } else {
                b.style.backgroundPositionY = '0px'
            }
        })
    })
})(document || {});