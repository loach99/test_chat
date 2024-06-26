let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);
const cat = new Image();
cat.src = './img/5eXXf4mf6iE.jpg'
console.log(cat)
window.addEventListener('DOMContentLoaded', () => {

    const expertName = document.querySelector(".expert_name");
    const expertNamePlace = document.querySelector(".expert_name-place");
    const expertBlock = document.querySelector("#expert_block");
    const chatImgUser = document.querySelector(".img_user");
    const otherMessage = document.querySelector(".other_message");
    const messageForm = document.querySelector(".footer_form");

    function animateBlock(image) {
        let block = document.getElementById('expert_block');
        let img = document.createElement('img');
        let div = document.createElement('div');
        img.setAttribute('src', image);
        div.classList.add('img_expert-wrap')
        div.insertAdjacentElement('afterbegin', img)
        img.classList.add('expert_img')
        block.insertAdjacentElement('afterbegin', div)
        block.classList.add('show-block');
    }

    const promise = new Promise((resolve) => {

        setTimeout(() => {
            document.querySelector('.spinner-text').innerHTML = `Специалист найден. Подключение...`
        }, 1500)
        setTimeout(() => {
            document.querySelector('.loader-container').classList.add("hidden");
            resolve()
        }, 25)
    })

    const promise2 = new Promise((resolve) => {
        //здесь запрос на сервер
        fetch(`https://jsonplaceholder.typicode.com/photos/${Math.floor(Math.random() * 1000)}`)
            .then(response => response.json())
            .then(response => resolve(response))

    })
    promise.then(() => {

        promise2
            .then((data) => {
                animateBlock(data.url);
       
                return data
            })
            .then((data) => {
                animateTyping(data.title.charAt(0).toUpperCase() + data.title.slice(1))
                setTimeout(() => {
                    moveToMessage(document.querySelector('.expert_img'), chatImgUser);
                }, 2000)
            })
            .then(() => {
                setTimeout(() => {
                    moveToChatHeader(expertName, expertNamePlace);
                }, 1500)
            })
    })

    function animateTyping(message) {
        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                document.querySelector('.footer').style.opacity = '1';
                document.querySelector('.message_wrapper').classList.add('show');
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
                otherMessage.children[0].children[0].innerHTML = `${message}`;
                document.querySelector('.form_textarea').removeAttribute('disabled');
            }, 4000)
        })
    }
    function moveToChatHeader(picture, cart) {
        let picture_pos = picture.getBoundingClientRect();
        let cart_pos = cart.getBoundingClientRect();
        setTimeout(() => {
            picture.style.position = "fixed";
            picture.style.left = picture_pos['x'] + "px";
            picture.style.top = picture_pos['y'] + "px";
            picture.style.zIndex = 32767;
            picture.style.color = '#fff'
            picture.style.backgroundColor = 'rgb(167 107 212 / 90%)';
            picture.style.padding = '5px 8px';
            picture.style.borderRadius = '25px'
            let start_x = picture_pos['x'] - 0.1 * picture_pos['width'];
            let start_y = picture_pos['y'] + 0.35 * picture_pos['height'];

            let delta_x = (cart_pos['x'] + 0.5 * cart_pos['width']) - start_x;
            let delta_y = (cart_pos['y'] + 0.5 * cart_pos['height']) - start_y;

            document.body.appendChild(picture);
            void picture.offsetWidth;
            picture.style.transform = "translateX(" + delta_x + "px)";
            picture.style.transform += "translateY(" + delta_y + "px)";
            picture.style.transition = "1s";
            picture.style.color = '#fff'
            picture.style.backgroundColor = 'rgb(167 107 212 / 90%)';
            picture.style.padding = '5px 8px';
            picture.style.borderRadius = '25px'
            picture.style.fontSize = '14px'
        }, 1000)

        document.querySelector('.expert_title').classList.add('hidden');

        setTimeout(() => {
            expertNamePlace.appendChild(picture);
            picture.style.position = "static";
            picture.style.color = '#fff';
            picture.style.fontSize = '14px'
        }, 2000)

    }
    function moveToMessage(picture, cart) {
        let picture_pos = picture.getBoundingClientRect();
        let cart_pos = cart.getBoundingClientRect();

        picture.style.position = "fixed";
        picture.style.left = picture_pos['x'] + "px";
        picture.style.top = picture_pos['y'] + "px";
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
            picture.style.transform = 'none';
            picture.style.width = '50px';
            picture.style.height = '50px';
            picture.style.display = 'block';
            picture.style.padding = '0';
            document.querySelector('.expert_img').style.width = '50px'
            document.querySelector('.expert_img').style.height = '50px'
        }, 1000)

    }
    function addMessage(text, type) {
        let div = document.createElement('div');
        let p = document.createElement('div')
        p.classList.add('chat_typing')
        if (!type) {
            return
        }
        if (type === 'my_message') {
            div.classList.add('test_box');
            div.classList.add('message');
            div.classList.add('my_message');
            div.classList.add('right');
            div.appendChild(p)
            p.textContent = text;
            document.querySelector('.chat_message-window').insertAdjacentElement('afterbegin', div);
        } else if (type === 'other_message') {

            const testBoxDiv = document.createElement('div');//текст сообщения

            const messageWrapper = document.createElement('div');//обертка всего сообщения
            messageWrapper.classList.add('message_wrapper','show');
            testBoxDiv.classList.add('test_box', 'message', 'other_message','left');
            let firstExpertImg = document.querySelector('.expert_img');

            // Создаем первый дочерний div с классом "img_user"
            const imgUserDiv = document.createElement('div');//div с изображением
            imgUserDiv.classList.add('img_user');
            messageWrapper.appendChild(imgUserDiv);
            const expertImg = document.createElement('img');
            expertImg.classList.add('expert_img');
            expertImg.style.width = '50px'
            expertImg.style.height = '50px'
            // устанавлтваем атрибут из изображения полученного с бэка 
            expertImg.setAttribute('src', firstExpertImg.getAttribute('src'));
            imgUserDiv.appendChild(expertImg);
            messageWrapper.appendChild(testBoxDiv)

            // Создаем второй дочерний div с классом "chat_typing"
            const chatTypingDiv = document.createElement('div');
            chatTypingDiv.classList.add('chat_typing');
            testBoxDiv.appendChild(chatTypingDiv);
            chatTypingDiv.textContent = text;
            document.querySelector('.chat_message-window').insertAdjacentElement('afterbegin', messageWrapper);
        }
    }
    function debounce(fn, delay) {
        let timeoutId;
        let strings = [];

        return function (...args) {
            strings.push(...args);

            clearTimeout(timeoutId);

            timeoutId = setTimeout(() => {
                fn(strings);
                strings = [];
            }, delay);
        };
    }
    function fetchArray(strings) {
        const promise = new Promise((resolve, reject) => {

            fetch(`https://jsonplaceholder.typicode.com/comments/${Math.floor(Math.random() * 500)}`)
                .then(response => response.json())
                .then(response => resolve(response))

        })
        promise.then((data) => {
            setTimeout(() => {
                addMessage(data.body.charAt(0).toUpperCase() + data.body.slice(1), 'other_message');
            }, 0)
        })
        console.log(strings);
    }
    const debouncedFunction = debounce(fetchArray, 3000);
    messageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let inputValue = document.querySelector('.form_textarea').value;
        if (inputValue) {
            addMessage(inputValue, 'my_message');
            createLoadingText('.chat_message-window');
            debouncedFunction(inputValue);
        }
        document.querySelector('.form_textarea').value = '';
    })
    //боковое меню и бургер
    // document.querySelector('.burger').addEventListener('click', () => {
    //     document.querySelector('.chat_user_list-wrap').classList.add('active');
    //     document.querySelector('.chat_user-close-modal').style.display = 'block'
    // })
    // document.querySelector('.chat_user-close-modal').addEventListener('click', () => {
    //     document.querySelector('.chat_user_list-wrap').classList.remove('active')
    //     document.querySelector('.chat_user-close-modal').style.display = 'none'
    // })
    // document.querySelectorAll('.user_list-onBack')[1].addEventListener('click', () => {
    //     document.querySelector('.chat_user_list-wrap').classList.remove('active')
    // })

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
            document.querySelectorAll('.loading-wave').forEach(elem => {
                elem.classList.add('hidden');
            })
        }, 2500)
    }
    document.querySelectorAll(".accordion-item").forEach((item) => {
        item.querySelector(".accordion-item-header").addEventListener("click", () => {
            item.classList.toggle("open");
        });
    });

});
