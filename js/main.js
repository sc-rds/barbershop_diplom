$(document).ready(() => {

    $('#our_masters-content').slick({
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 2,
        dots: true,
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: false,
                    centerMode: true
                }
            }, {
                breakpoint: 690,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: false,
                    centerMode: true
                }
            }, {
                breakpoint: 426,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                }
            }
        ]
    });

    $('#info-slick').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        dots: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: false,
                }
            }, {
                breakpoint: 425,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                    centerMode: true
                }
            },
        ]
    });

    // Услуги, переключатель
    $('.option').click((e) => {
        let containerElement = $(e.target);
        $('.srv-options-container').hide();
        let id = containerElement.data('id');
        $('#' + id).show().css('display', 'flex');

        $('.option').removeClass('active');
        containerElement.addClass('active');
    });

    // Анимации
    new WOW({
        animateClass: 'animate__animated',
    }).init();

    // стрелка "вверх"
    mybutton = document.getElementById("up");
    window.onscroll = function () {
        scrollFunction()
    };

    function scrollFunction() {
        if (document.body.scrollTop > 700 || document.documentElement.scrollTop > 700) {
            mybutton.style.display = "block";
        } else {
            mybutton.style.display = "none";
        }
    }

    // POPUP скидка
    $('#discount-button').click(() => {
        $('#discount-popup').css('display', 'flex');
    });

    $('#discount-popup-container').click((e) => {
        $('#discount-popup').hide();
    });

    //  POPUP заказать звонок
    $('.open-modal').click(() => {
        $('#call-request-container').css('display', 'flex');
    });

    $('#call-request-close, #call-request').click((e) => {
        if (e.target.id === 'call-request' || e.target.id === 'call-request-close') {
            $('#call-request-container').hide();
        }
    });

    $('#call-request-btn > button').click(() => {
        let name = $('#name');
        let phone = $('#phone');

        if (name.val() && phone.val()) {
            $('#access-form').show();
            $('#form-hide').hide();
            $.ajax({
                type: 'post',
                url: 'mail_call.php',
                data: 'name=' + name.val() + '&phone' + phone.val(),
                success: () => {
                    $('#access-form').show();
                    $('#form-hide').hide();
                },
                error: () => {
                    $('#call-request-container').hide();
                    // alert('Ошибка бронирования. Свяжитесь, пожалуйста, по номеру телефона.');
                }
            });
        } else {

            //  валидация (POPUP "заказать звонок")
            $('.input-error').hide();

            let input = $('.val-inp');
            input.css('border-color', 'rgb(0, 255, 26)');

            for (let i = 0; i < input.length; i++) {
                if (!$(input[i]).val()) {
                    $(input[i]).css('border-color', 'rgb(255, 0, 0)');
                    $(input[i]).siblings('.input-error').show();
                }
            }
        }
    });

    //POPUP "записаться"
    $('.sign_up').click(() => {
        $('#services-request').css('display', 'flex');
        $('#services-request-container').show();
        $('#services-request-shadow').show();
        $('#services-request-content').show();
    });

    $('#service-request-cancel, #services-request-container').click((e) => {
        if (e.target.id === 'services-request-container' || e.target.id === 'service-request-cancel') {
            $('#services-request').hide();
            $('#services-request-container').hide();
        }
    });

    $('#services-request-block > button').click(() => {
        let name = $('#request-name');
        let phone = $('#request-phone');
        let option = $('#request-option');
        let barberName = $('#barber_name');
        let date = $('#request-date');
        let time = $('#request-time');

        if (name.val() && phone.val() && option.val() && barberName.val() && date.val() && time.val()) {
            $('#accept-request').show();
            $('#services-request-content').hide();
            $.ajax({
                type: 'post',
                url: 'mail_request.php',
                data: 'name=' + name.val() + '&phone' + phone.val() + '&option=' + option.val() + '&barberName=' + barberName.val() + '&date=' + date.val() + '&time=' + time.val(),
                success: () => {
                    $('#accept-request').show();
                    $('#services-request-content').hide();
                },
                error: () => {
                    $('#services-request').hide();
                    // alert('Ошибка бронирования. Свяжитесь, пожалуйста, по номеру телефона.');
                }
            });
        } else {

            //  валидация (POPUP "записаться")
            $('.error-input').hide();

            let input = $('.inp-val');
            input.css('border-color', 'rgb(0, 255, 26)');

            for (let i = 0; i < input.length; i++) {
                if (!$(input[i]).val()) {
                    $(input[i]).css('border-color', 'rgb(255, 0, 0)');
                    $(input[i]).siblings('.error-input').show();
                }
            }

            let select = $('.val-select');
            select.css('border-color', 'rgb(0, 255, 26)');

            for (let i = 0; i < select.length; i++) {
                if (!$(select[i]).val()) {
                    $(select[i]).css('border-color', 'rgb(255, 0, 0)');
                    $(select[i]).siblings('.error-input').show();
                }
            }

        }
    });

    //POPUP "accept-request"
    $('#accept-request-cancel').click(() => {
        $('#accept-request').css('display', 'none');
        $('#services-request').hide();
    });

    $('#accept-request-cancel, #services-request-container').click((e) => {
        if (e.target.id === 'services-request-container' || e.target.id === 'accept-request-cancel') {
            $('#accept-request').hide();
            $('#services-request').hide();
            $('#services-request-container').hide();
        }
    });

    $('#burger').click(() => {
        $('#header-nav').css('display', 'flex');
    });


    // $('#header-nav a').click(() => {
    //     $('#header-nav').css('display', 'none');
    // });

});