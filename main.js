document.addEventListener("DOMContentLoaded", function () {
    const headerEl = document.getElementById("header");
    const footerEl = document.getElementById("footer");

    if (headerEl) {
        fetch("header.html")
            .then(response => response.text())
            .then(data => headerEl.innerHTML = data)
            .catch(error => console.error("Header Load Error:", error));
    } else {
        console.error("Header element not found!");
    }

    if (footerEl) {
        fetch("footer.html")
            .then(response => response.text())
            .then(data => footerEl.innerHTML = data)
            .catch(error => console.error("Footer Load Error:", error));
    } else {
        console.error("Footer element not found!");
    }
});
