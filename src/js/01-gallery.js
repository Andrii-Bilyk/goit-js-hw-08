import SimpleLightbox from "simplelightbox"; 

import "simplelightbox/dist/simple-lightbox.min.css"; 

import { galleryItems } from "./gallery-items.js"; 

document.addEventListener("DOMContentLoaded", function () {

  const galleryUl = document.querySelector(".gallery");


  const galleryMarkup = galleryItems
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img
            class="gallery__image"
            src="${preview}"
            alt="${description}"
          />
        </a>
      </li>`;
    })
    .join("");


  galleryUl.insertAdjacentHTML("beforeend", galleryMarkup);


  const lightbox = new SimpleLightbox(".gallery a", {
    captionsData: "alt",
    captionDelay: 250,
  });
});
