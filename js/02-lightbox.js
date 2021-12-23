import { galleryItems } from './gallery-items.js';

//Находим элемент div.gallery
const galleryEl = document.querySelector('.gallery');
//Генерируем строку с разметкой карточек галереи изображений
const galleryMarkup = createGalleryCardsMarkup(galleryItems);
//Добавляем разметку карточек галереи изображений в элемент galleryEl
galleryEl.insertAdjacentHTML('beforeend', galleryMarkup);
//Добавляем слушателя события 'click' на элемент galleryEl
galleryEl.addEventListener('click', onGalleryCardClick);

// Ф-ция: принимает массив объектов (galleryItems), с данными для карточек изображений, 
//        возвращает строку с разметкой карточек галереи изображений
function createGalleryCardsMarkup(galleryItems) {
    return galleryItems.map(({ preview, original, description }) => {
        return `
            <a class="gallery__item" href="${original}">
                <img class="gallery__image" src="${preview}" alt="${description}" />
            </a>`;
    }).join('');
}; 

//Ф-ция:
//     отменяет действия браузера по умолчанию;
//     проверяет условие клика по элементу img (не реагирует на клик на др элементы);
//     создает и открывает слайдер (lightbox - библиотека SimpleLightbox, класс SimpleLightbox, метод open()), с оригинальными (большими - original) изображениями;
//     свойства - для описания изображений (подпись изображений):
//             captionSelector - указывает элемент который содержит описание
//             captionType - указывает где именно в элементе находится описание (атрибут, дата-атрибут, текст)
//             captionsData - указывает в каком атрибуте хранится описание
//             captionPosition - указывает положение описания (вверху, внизу, за пределами изображения)
//             captionDelay - указывает задержку появления подписи
//             enableKeyboard - позволяет навигацию с клавиатуры (<- ->) и выход при нажатии Esc
function onGalleryCardClick(evt) {
    evt.preventDefault();

    if(!evt.target.classList.contains('gallery__image')) {
        return;
    }

    let lightbox = new SimpleLightbox('.gallery a',
        {
            captionSelector: 'img',
            captionType: 'attr',
            captionsData: 'alt',
            captionPosition: 'bottom',
            captionDelay: 250,
            enableKeyboard: true,
        });
    lightbox.open();
};

