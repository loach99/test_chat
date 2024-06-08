let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

window.addEventListener('DOMContentLoaded', () => {
    function animateBlock(image) {
        let block = document.getElementById('expert_block');
        let img = document.createElement('img');
        img.setAttribute('src', image);
        img.classList.add('expert_img')
        block.insertAdjacentElement('afterbegin', img)
        block.classList.add('show-block');
    }

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            document.querySelector('.spin-wrapper').classList.add("hidden");
            resolve()
        }, 2000)
    })
    const promise2 = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Salam!")
        }, 2)
    })
    promise.then(() => {
        promise2
            .then((data) => {
                animateBlock('./img/5eXXf4mf6iE.jpg')
                console.log(123)
                return data
            })
            .then((data) => {
                animateTyping(data)
                console.log(data)
                setTimeout(() => {
                    moveToMessage(expertBlock, chatImgUser)
                }, 1000)
            })
    })
    const expertBlock = document.querySelector("#expert_block");
    const chatImgUser = document.querySelector(".img_user");
    const otherMessage = document.querySelector(".other_message");
    const dot1 = document.querySelector(".dot1");
    const dot2 = document.querySelector(".dot2");
    const dot3 = document.querySelector(".dot3");

    function animateTyping(message) {
        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                otherMessage.classList.add('show');
                setInterval(() => {
                    dot1.classList.toggle("active-dot1")
                }, 500);
                setInterval(() => {
                    dot2.classList.toggle("active-dot2")
                }, 500);
                setInterval(() => {
                    dot3.classList.toggle("active-dot3")
                }, 500);
                resolve()
            }, 1000)

        })
        promise.then(() => {
            setTimeout(() => {
                otherMessage.children[1].children[0].innerHTML = `${message}`;
                document.querySelector('.form_textarea').removeAttribute('readonly');
            }, 2000)
        })
    }
    function moveToMessage(picture, cart) {
        let picture_pos = picture.getBoundingClientRect();
        let cart_pos = cart.getBoundingClientRect();

        picture.style.position = "fixed";
        picture.style.left = picture_pos['x'] + "px";
        picture.style.top = picture_pos['y'] + "px";
        picture.style.border = "5px solid grey";
        picture.style.zIndex = 32767;

        let start_x = picture_pos['x'] + 0.5 * picture_pos['width'];
        let start_y = picture_pos['y'] + 0.5 * picture_pos['height'];

        let delta_x = (cart_pos['x'] + 0.5 * cart_pos['width']) - start_x;
        let delta_y = (cart_pos['y'] + 0.5 * cart_pos['height']) - start_y;

        document.body.appendChild(picture);
        void picture.offsetWidth;
        picture.style.transform = "translateX(" + delta_x + "px)";
        picture.style.transform += "translateY(" + delta_y + "px)";
        picture.style.transform += "scale(0.25)";
        picture.style.transition = "1s";
        setTimeout(() => {
            document.querySelector('.img_user').appendChild(picture);
            picture.style.position = "static";
            picture.style.border = "1px solid grey";
            picture.style.transform = 'none';
            picture.style.width = '50px';
            picture.style.height = '50px';
            document.querySelector('.expert_img').style.width = '50px'
            document.querySelector('.expert_img').style.height = '50px'
        }, 1000)

    }

    const messageForm = document.querySelector(".footer_form");

    function addMessage(text) {
        let div = document.createElement('div');
        div.classList.add('test_box')
        div.classList.add('message')
        div.classList.add('my_message')
        div.textContent = text;
        document.querySelector('.chat_view_window').insertAdjacentElement('afterbegin', div);
    }
    messageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addMessage(document.querySelector('.form_textarea').value);
        document.querySelector('.form_textarea').value = '';
    })

    document.querySelector('.burger').addEventListener('click', () => {
        document.querySelector('.chat_user_list').classList.add('active')
    })
    document.querySelector('.user_list-onBack').addEventListener('click', () => {
        document.querySelector('.chat_user_list').classList.remove('active')
    })

});
