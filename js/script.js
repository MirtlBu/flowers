var bouqets = [
    {
        url: 'img/bouquet-1.jpg',
        title: 'Розовый флёр',
        text: 'Яркий круглый букет из белых гербер и красных роз - вариант красивого подарка на праздник. Диаметр букета около 30см.',
        price: '5000'
    },
    {
        url: 'img/bouquet-2.jpg',
        title: 'Солнечный день',
        text: 'Красивый и теплый по фактуре букет состоит из герминий, ирисов, филинггрина, кустовых нарцисов, статицы.',
        price: '3500'
    },
    {
        url: 'img/bouquet-3.jpg',
        title: 'Цветочный фонтан',
        text: 'В этом букете собраны: красные Розы, Каллы, кремовые Орхидеи, веточки Гиперикума. Диаметр букета около 30см.',
        price: '2000'
    },
    {
        url: 'img/bouquet-4.jpg',
        title: 'Летний луг',
        text: 'Этот круглый букет создан из разнообразных «диких» цветов: ромашек, антирринума и ирисов. Диаметр букета около 50см.',
        price: '4400'
    },
];

function renderGalleryItem(bouqet) {
    return $('<div/>', {'class': 'gallery__item'})
    .append($('<img/>', {'src': bouqet.url}))
    .append($('<div/>', {'class': 'description'})
        .append($('<div/>', {'class': 'title'}).text(bouqet.title))
        .append($('<div/>', {'class': 'text'}).text(bouqet.text))
        .append($('<div/>', {'class': 'price'}).append($('<span/>').text(bouqet.price)).append($('<span/>').text(' руб')))
        .append($('<button/>', {'class': 'button'}).text('Добавить в корзину')))
}

function renderGallery(index, down, up) {
    for (var i = down; i < up; i++) {
        $('.gallery__container').append(renderGalleryItem(bouqets[index]));
    }
}

$(function(){
    for(var j = 0; j < 4; j++) {
        renderGallery(j, 0, 3);
    };

    $('.gallery').on('click', '.nav__item', function() {
        $('.gallery__container').empty();
        var index = $(this).attr('data-index');
        $('.gallery').find('.nav__item').removeClass('nav__item--active');
        $(this).addClass('nav__item--active');
        if(index == 4) {
            for( var j = 0; j < 4; j++) {
                renderGallery(j, 0, 10);
            }
        }
        else {
            renderGallery(index, 0, 10);
        }
    });

    $('.pagination').on('click', '.pagination__item', function() {
        var index = $(this).attr('data-index');
        $('.gallery__container').empty();

        if(index == 1) {
            for(var j = 3; j > 0; j--) {
                renderGallery(j, 0, 3);
            };
        }
        else {
            for(var j = 0; j < 4; j++) {
                renderGallery(j, 0, 3);
            };
        }

        $('.pagination').find('.pagination__item').removeClass('pagination__item--active');
        $(this).addClass('pagination__item--active');
    })
});


$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});

$(function() {
    // if($(window).scrollTop() < $('#frontpage').height()) {
    //     $(window).one('scroll', function() {
    //         // $('html,body').animate({scrollTop: $('#gallery').offset().top}, 1000);
    //        window.scrollTo(0, 0);
    //     })
    // }

});

$(window).one('scroll', function() {
    console.log($(window).scrollTop());
    console.log($('#gallery').offset().top);
    if($(window).scrollTop() < $('#gallery').offset().top || $(window).scrollTop() == 0) {
        $("html, body").animate({ scrollTop: $('#gallery').offset().top }, "slow");
    }
    else if($(window).scrollTop() > $('#gallery').offset().top) {
        $("html, body").finish();
    }
});

ymaps.ready(init);
var myMap, myPlacemark;

function init(){
    myMap = new ymaps.Map("map", {
        center: [55.76, 37.63],
        zoom: 14
    });
    Placemark1 = new ymaps.Placemark([55.746586, 37.623894],
        { content: 'Москва!', balloonContent: 'ул. Старая, 34/2', ballonCloseButton: false },
        {
            iconLayout: 'default#image',
            iconImageHref: 'img/icon-pin.png',
            iconImageSize: [29, 40],
            iconImageOffset: [-3, -42],
            hideIconOnBalloonOpen: false,
            balloonOffset: [0, -60],
            balloonCloseButton: false
        });

    Placemark2 = new ymaps.Placemark([55.751222, 37.621383],
        { content: 'Москва!', balloonContent: 'ул. Старая, 34/2', ballonCloseButton: false },
        {
            iconLayout: 'default#image',
            iconImageHref: 'img/icon-pin.png',
            iconImageSize: [29, 40],
            iconImageOffset: [-3, -42],
            hideIconOnBalloonOpen: false,
            balloonOffset: [0, -60],
            balloonCloseButton: false
        });

    Placemark3 = new ymaps.Placemark([55.751004, 37.636189],
        { content: 'Москва!', balloonContent: 'ул. Старая, 34/2', ballonCloseButton: false },
        {
            iconLayout: 'default#image',
            iconImageHref: 'img/icon-pin.png',
            iconImageSize: [29, 40],
            iconImageOffset: [-3, -42],
            hideIconOnBalloonOpen: false,
            balloonOffset: [0, -60],
            balloonCloseButton: false
        });

    myMap.geoObjects.add(Placemark1);
    myMap.geoObjects.add(Placemark2);
    myMap.geoObjects.add(Placemark3);
    myMap.controls.remove('typeSelector').remove('mapTools').remove('searchControl').remove('trafficControl');
    myMap.behaviors.disable("scrollZoom");

    Placemark1.events
        .add('mouseenter', function (e) {
            // myMap.balloon.open();
            e.get('target').options.set({
                'iconImageHref': 'img/icon-pin-hover.png',
                'iconImageSize': [77, 65],
                'iconImageOffset': [-13, -65]});
        })
        .add('mouseleave', function (e) {
            // myMap.balloon.close();
            e.get('target').options.set({
                'iconImageHref': 'img/icon-pin.png',
                'iconImageSize': [29, 40],
                'iconImageOffset': [-3, -42]});
        });

        Placemark2.events
        .add('mouseenter', function (e) {
            // myMap.balloon.open();
            e.get('target').options.set({
                'iconImageHref': 'img/icon-pin-hover.png',
                'iconImageSize': [77, 65],
                'iconImageOffset': [-13, -65]});
        })
        .add('mouseleave', function (e) {
            // myMap.balloon.close();
            e.get('target').options.set({
                'iconImageHref': 'img/icon-pin.png',
                'iconImageSize': [29, 40],
                'iconImageOffset': [-3, -42]});
        });

        Placemark3.events
        .add('mouseenter', function (e) {
            // myMap.balloon.open();
            e.get('target').options.set({
                'iconImageHref': 'img/icon-pin-hover.png',
                'iconImageSize': [77, 65],
                'iconImageOffset': [-13, -65]});
        })
        .add('mouseleave', function (e) {
            // myMap.balloon.close();
            e.get('target').options.set({
                'iconImageHref': 'img/icon-pin.png',
                'iconImageSize': [29, 40],
                'iconImageOffset': [-3, -42]});
        });
}


