document.addEventListener("DOMContentLoaded", function() {
    const cartIcon = document.querySelector(".cart-icon");
    const overlay = document.querySelector(".overlay");
    const overlayContent = document.querySelector(".overlay-content");

    cartIcon.addEventListener("click", function() {
        overlay.classList.add("active");
        overlayContent.classList.add("active");
    });

    overlay.addEventListener("click", function() {
        overlay.classList.remove("active");
        overlayContent.classList.remove("active");
    });
});
