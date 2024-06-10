const marque = document.querySelectorAll('.marque');

marque.forEach(elem => {
    elem.addEventListener('mouseenter', (e) => {
        Array.from(elem.closest('.items_wrap').children).forEach(elem=>{
            elem.classList.add('markque_stop')
        })
    })
})
marque.forEach(elem => {
    elem.addEventListener('mouseleave', (e) => {
        Array.from(elem.closest('.items_wrap').children).forEach(elem=>{
            elem.classList.remove('markque_stop')
        })
    })
})