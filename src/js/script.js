$(document).ready(function(){

    $('.carousel__inner').slick({
        speed: 1200,/* 
        adaptiveHeight: true, */
        prevArrow: '<button type="button" class="slick-prev"><img src="../icons/left.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="../icons/right.svg"></button>',
        responsive: [  
            {
                breakpoint: 992,
                settings: {
                    dots: true,
                    arrows: false,
                    autoplay: false,
                    autoplaySpeed: 3000,
                    fade: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    dots: true, 
                    arrows: false,  
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    dots: true, 
                    arrows: false,  
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
      });

      // Tabs to switch a Catalog "Для Фитнеса, Для Бега, для Триатлона"
      $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });

      // Taggle to switch "Подробнее, Назад"
    function toggleSlide (item) {
        $(item).each(function (i) {
            $(this).on ('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            });
        });
    }
toggleSlide ('.catalog-item__link');
toggleSlide ('.catalog-item__back');

    // Modal Windows 
    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
    });
    //Close modal windows
    $('.modal__close').on('click', function(){
        $('.overlay, #consultation, #order, #thanks_title').fadeOut('slow');
    });
    // function chanje text in catalog
    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            // button buy catalog
            $('.overlay, #order').fadeIn('slow');
        });
    });

    


    function validateForms (form) {
        $(form).validate({ 
            rules: {
                name: {
                    required: true,
                    minlength: 2
                  },
                phone:"required",
                email:{
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Пожалуйсто введите своё имя",
                    minlength: jQuery.validator.format("Введите миниму  {0} символа")
                  },
                phone: "Напишите свой номер телефона",
                email: {
                  required: "Укажите свой email адресс",
                  email: "Неправильный формат, пример: name@domain.com"
                }
              }
        });
    }

    validateForms ('#consultation-form');
    validateForms ('#consultation form');
    validateForms ('#order form'); 


    //ajax for mail submit 
    $('form').submit(function(e){
        e.preventDefault(); 

        if(!$(this).valid()) {
            return;
        }

        $.ajax({
            type: "POST",
            url: 'mailer/smart.php',
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('#overlay, #thanks_title').fadeIn('slow'); 
            $('form').trigger('reset');
        });
        return false; 
    });
   // Add smooth scrolling to all links
    $(window).scroll(function() {
        if($(this).scrollTop()>1400) {
           $('.rowup').fadeIn();  
        } else {
            $('.rowup').fadeOut(); 
        }
    });
    $(".rowup").on('click', function(event) {
        if (this.hash !== "") {
          event.preventDefault();
          const hash = this.hash;
          $('html, body').animate({
            scrollTop: $(hash).offset().top
          }, 800, function(){
            window.location.hash = hash;
          });
        } // End if
      });
  });