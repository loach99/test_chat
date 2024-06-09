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
        }, 2)
    })
    const promise2 = new Promise((resolve, reject) => {
        //здесь запрос на сервер
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
                    moveToChatHeader(expertName, expertNamePlace)
                }, 1000)
            })
    })
    const expertName = document.querySelector(".expert_name");
    const expertNamePlace = document.querySelector(".expert_name-place");
    const expertBlock = document.querySelector("#expert_block");
    const chatImgUser = document.querySelector(".img_user");
    const otherMessage = document.querySelector(".other_message");

    function animateTyping(message) {
        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                otherMessage.classList.add('show');
                resolve()
            }, 2000)
        })
        promise.then(() => {
            setTimeout(() => {
                createLoadingText('.chat_message-window ')
            }, 1000)
        })
        promise.then(() => {
            setTimeout(() => {
                otherMessage.children[1].children[0].innerHTML = `${message}`;
                document.querySelector('.form_textarea').removeAttribute('readonly');
            }, 4000)
        })
    }
    function moveToChatHeader(picture, cart) {
        let picture_pos = picture.getBoundingClientRect();
        let cart_pos = cart.getBoundingClientRect();

        picture.style.position = "fixed";
        picture.style.left = picture_pos['x'] + "px";
        picture.style.top = picture_pos['y'] + "px";
        picture.style.zIndex = 32767;
        picture.style.color = '#4590cd'
        let start_x = picture_pos['x'] + 0.5 * picture_pos['width'];
        let start_y = picture_pos['y'] + 0.5 * picture_pos['height'];

        let delta_x = (cart_pos['x'] + 0.5 * cart_pos['width']) - start_x;
        let delta_y = (cart_pos['y'] + 0.5 * cart_pos['height']) - start_y;

        document.body.appendChild(picture);
        void picture.offsetWidth;
        picture.style.transform = "translateX(" + delta_x + "px)";
        picture.style.transform += "translateY(" + delta_y + "px)";
        picture.style.transition = "1s";
        picture.style.color = '#4590cd'
        document.querySelector('.expert_title').classList.add('hidden')
        setTimeout(() => {
            expertNamePlace.appendChild(picture);
            picture.style.position = "static";
            picture.style.color = '#4590cd'
        }, 1000)

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

    function addMessage(text, type) {
        let div = document.createElement('div');
        if (!type) {
            return
        }
        if (type === 'my_message') {
            div.classList.add('test_box')
            div.classList.add('message')
            div.classList.add('my_message')
            div.textContent = text;
            document.querySelector('.chat_message-window').insertAdjacentElement('afterbegin', div);
        } else if (type === 'other_message') {

            const testBoxDiv = document.createElement('div');
            testBoxDiv.classList.add('test_box', 'message', 'other_message', 'show');
            let firstExpertImg = document.querySelector('.expert_img');

            // Создаем первый дочерний div с классом "img_user"
            const imgUserDiv = document.createElement('div');
            imgUserDiv.classList.add('img_user');
            testBoxDiv.appendChild(imgUserDiv);
            const expertImg = document.createElement('img');
            expertImg.classList.add('expert_img');
            expertImg.style.width = '50px'
            expertImg.style.height = '50px'
            // устанавлтваем атрибут из изображения полученного с бэка 
            expertImg.setAttribute('src',firstExpertImg.getAttribute('src'));
            imgUserDiv.appendChild(expertImg);

            // Создаем второй дочерний div с классом "chat_typing"
            const chatTypingDiv = document.createElement('div');
            chatTypingDiv.classList.add('chat_typing');
            testBoxDiv.appendChild(chatTypingDiv);
            chatTypingDiv.textContent = text;
            document.querySelector('.chat_message-window').insertAdjacentElement('afterbegin', testBoxDiv);
        }
    }

    messageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addMessage(document.querySelector('.form_textarea').value, 'my_message');

        createLoadingText('.chat_message-window')
        setTimeout(() => {
            addMessage("hello world!", 'other_message');
        }, 3000)
        document.querySelector('.form_textarea').value = '';
    })

    document.querySelector('.burger').addEventListener('click', () => {
        document.querySelector('.chat_user_list').classList.add('active')
    })
    document.querySelectorAll('.user_list-onBack')[1].addEventListener('click', () => {
        document.querySelector('.chat_user_list').classList.remove('active')
    })

    function createLoadingText(pasteTo) {

        const waveDiv = document.createElement('div');
        waveDiv.classList.add('loading-wave');

        for (let i = 0; i < 4; i++) {
            const barDiv = document.createElement('div');
            barDiv.classList.add('loading-bar');
            waveDiv.appendChild(barDiv);
        }
        document.querySelector(pasteTo).insertAdjacentElement('afterbegin', waveDiv)
        setTimeout(() => {
            document.querySelector('.loading-wave').classList.add('hidden')
        }, 2500)
    }
});
