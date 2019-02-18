window.addEventListener('DOMContentLoaded', function() {

    // Menu
    let button = document.querySelector('.menu-pop'),
        menu = document.querySelector('.menu-pop .links');

    button.addEventListener('mouseover', function() {
        menu.style.display = 'block';
    });

    button.addEventListener('mouseout', function() {
        menu.style.display = 'none';
    });


    // Scroll
    let buttonChoice = document.querySelector('.choice'); 

    // прокрутка простым скачком
    // function scrollToCatalog() {
    //     let catalog = document.querySelector('.catalog');
    //     window.scrollBy(0, catalog.getBoundingClientRect().top);
    // }
    // buttonChoice.addEventListener('click', scrollToCatalog);

    // coord - расстояние до объекта, stepPix - шаг прокрутки, stepTime - время шага
    // все равно в FF случаются перелеты
    function scrollToStep(coord = 0, stepPix = 20, stepTime = 20) {
        if (coord > stepPix) {
            window.scrollBy(0, stepPix);
            setTimeout(function() {
                //console.log(coord, document.querySelector('.catalog').getBoundingClientRect().top);
                scrollToStep(document.querySelector('.catalog').getBoundingClientRect().top, stepPix, stepTime);
            }, stepTime);
        } else if (coord > 0) {
            window.scrollBy(0, coord);
            return false;
        } else {
            return false;            
        }
    }

    buttonChoice.addEventListener('click', function() {
        scrollToStep(document.querySelector('.catalog').getBoundingClientRect().top);
    });



    // Cruise
    let cruise = document.querySelectorAll('.cruise .img');
    // for (let i = 0; i < cruise.length; i++) {
    //     if (i == 0) cruise[i].style.height = '432px';
    //     if (i == 1 || i == 2) cruise[i].style.height = '113px';
    //     if (i == 3 || i == 4) cruise[i].style.height = '215px';
    // } 


    // Modal
    // если надо запретить прокрутку - снять комментарий
    function modalOn(i) {
        overlay.style.display = 'block';
        console.log(`Открыта модалка из карточки ${i}.`); // заготовка для разных карточек
        //document.body.style.overflow = 'hidden'; // запрет прокрутки     
    }

    function modalOff(event) {
        if (event.target.classList.contains('close') == true) { // оверлей или крестик
            overlay.style.display = 'none';
            //document.body.style.overflow = ''; // вернуть прокрутку 
        }
    }

    let overlay = document.querySelector('.overlay'); // весь оверлей

    for (let i = 1; i <= cruise.length; i++) {
        cruise[i-1].addEventListener('click', modalOn.bind(null, i));
    } 

    overlay.addEventListener('click', modalOff.bind(null));


    // Slider
    let slideIndex = 1,
        slides = document.querySelectorAll('.img-big'),
        control = document.querySelector('.img-min-wrap'),
        controls = document.querySelectorAll('.img-con');
    
    function showSlides() {
        if (slideIndex > slides.length) {
            slideIndex = 1;
        }
        if (slideIndex == 0) {
            slideIndex = slides.length;
        }

        slides.forEach((item) => item.style.display = 'none');
        controls.forEach((item) => item.parentNode.classList.remove('active'));

        slides[slideIndex - 1].style.display = 'block';
        controls[slideIndex - 1].parentNode.classList.add('active');
    }

    showSlides(slideIndex);

    control.addEventListener('click', function(event) {
        for (let i = 1; i < controls.length + 1; i++) {
            if (event.target.classList.contains('img-con') && event.target == controls[i-1]) {
                slideIndex = i;
                showSlides(slideIndex);
            }
        } 
    });
});