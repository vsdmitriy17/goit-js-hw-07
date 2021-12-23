import { galleryItems } from './gallery-items.js';

//Находим элемент div.gallery
const galleryEl = document.querySelector('.gallery');
//Генерируем строку с разметкой карточек галереи изображений
const galleryMarkup = createGalleryCardsMarkup(galleryItems);
//Добавляем разметку карточек галереи изображений в элемент galleryEl
galleryEl.insertAdjacentHTML('beforeend', galleryMarkup);
//Добавляем слушателя события 'click' на элемент galleryEl
galleryEl.addEventListener('click', onGalleryCardClick);
let instance;

// Ф-ция: принимает массив объектов (galleryItems), с данными для карточек изображений, 
//        возвращает строку с разметкой карточек галереи изображений
function createGalleryCardsMarkup(galleryItems) {
    return galleryItems.map(({ preview, original, description }) => {
        return `
        <div class="gallery__item">
            <a class="gallery__link" href="${original}">
                <img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}"/>
            </a>
        </div>`;
    }).join('');
}; 

//Ф-ция:
//     отменяет действия браузера по умолчанию;
//     проверяет условие клика по элементу img (не реагирует на клик на др элементы);
//     открывает модальное окно с оригинальным (большим - original) изображением;
//     добавляет слушателя события  'keydown' на элемент window
function onGalleryCardClick(evt) {
    evt.preventDefault();

    if(!evt.target.classList.contains('gallery__image')) {
        return;
    }

    openModalLightbox(evt);

    window.addEventListener('keydown', onEscKeyPress);
};

//Ф-ция - создает и открывает модальное окно (instance - библиотека basicLightbox, методы create(), show()), с оригинальным (большим - original) изображением;
function openModalLightbox(e) {
    instance = basicLightbox.create(`
		<img src="${e.target.dataset.source}">
	`);
    instance.show();
}

//Ф-ция, при нашатии на клавишу 'Escape'
//     закрывает модальное окно (instance - библиотека basicLightbox, метод close());
//     убирает слушателя события 'keydown' с элемента window
function onEscKeyPress(evt) {
    if (evt.code === 'Escape') {
        instance.close();
        window.removeEventListener('keydown', onEscKeyPress);
    };
};
