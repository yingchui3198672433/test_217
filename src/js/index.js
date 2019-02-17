var swiper = new Swiper('.banner-list', {
    slidesPerView: 2.6
});

var scroll = new BScroll('.list', {
    click: true
});

ajax({
    url: '/api/list',
    dataType: 'json',
    success: function(data) {
        if (data.code == 1) {
            render(data.data)
        }
    }
});


function render(data) {
    var list = document.querySelector('.list-cont');
    list.innerHTML = data.map(function(item) {
        return `<li>
                <div class="font">
                    <p class="title">${item.title}</p>
                    <p class="info">${item.info}</p>
                    <p class="date">${item.date}</p>
                </div>
                <div class="img">
                    <img src="${item.url}" alt="">
                </div>
            </li>`
    }).join();
}