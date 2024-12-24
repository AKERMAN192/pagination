let API_KEY = "b5e88ace8e5f4bcab5f406ba41d5c3fe";
let API_URL = "https://newsapi.org/v2/everything";

let news = "";
let pages = 1;
let pagesCount = 0;

let inpit = document.querySelector(".block__input");
let button = document.querySelector(".button__block");
let ul = document.querySelector(".block__news");
let btnLeft = document.querySelector(".btn1");
let btnRight = document.querySelector(".btn2");
let span = document.querySelector(".span");

button.addEventListener("click", function () {
  let input = inpit.value;
  if (input) {
    news = input;
    pages = 1;
    fetchNews();
  }
});

function fetchNews(){
  let ask = `${API_URL}?q=${encodeURIComponent(news)}&pageSize=6&page=${pages}&apiKey=${API_KEY}`;
  fetch(ask)
    .then((Response) => Response.json())
    .then((data) => {
        ul.innerHTML = "";
        data.articles.forEach((item) => {
            let newLi = document.createElement("li");
            newLi.classList.add("article-item");
            newLi.innerHTML = `<a href="${item.url}" target="_blank">
            <article>
                <img src="${item.urlToImage || 'https://via.placeholder.com/480'}" alt="${item.title}">
                <h2>${item.title}</h2>
                <p>Posted by: ${item.author || 'Unknown'}</p>
                <p>${item.description || 'No description available'}</p>
            </article>
        </a>`;
        ul.appendChild(newLi);
        });
        if(data.articles.length === 0){
          ul.innerHTML = `<li>No results found for "${news}"</li>`;
        }
        pagination(data.totalResults);
    })
    .catch((error) => {
      console.error(error);
      ul.innerHTML = '<li>Error loading news</li>';
    });
}

function pagination(totalResults){
  span.textContent = `Page ${pages}`;
  pagesCount = Math.ceil(totalResults / 6);
  btnLeft.disabled = pages <= 1;
  btnRight.disabled = pages >= pagesCount;
}

btnLeft.addEventListener("click", function () {
  if (pages > 1) {
    pages--;
    fetchNews();
  }
});

btnRight.addEventListener("click", function () {
  if (pages < pagesCount) {
    pages++;
    fetchNews();
  }
});
