function createArticleCard(article) {
  const { href, image, isNew, date, excerpt } = article;

  const imageMarkup = image
    ? `<img src="${image}" alt="" />`
    : `<span>article's image</span>`;

  const badgeMarkup = isNew
    ? `<span class="article-card__badge">New</span>
       <span class="article-card__dot" aria-hidden="true"></span>`
    : "";

  return `
    <article class="article-card">
      <a href="${href}" class="article-card__link">
        <span class="article-card__topbar" aria-hidden="true"></span>

        <div class="article-card__body">
          <div class="article-card__image">
            ${imageMarkup}
          </div>

          <div class="article-card__meta-row">
            ${badgeMarkup}
            <span class="article-card__date">${date}</span>
          </div>

          <p class="article-card__excerpt text-body">${excerpt}</p>
        </div>
      </a>
    </article>
  `;
}

function renderArticles(articles) {
  const grid = document.getElementById("articlesGrid");
  if (!grid) return;
  grid.innerHTML = articles.map(createArticleCard).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  const placeholder = document.getElementById("articles-placeholder");
  if (!placeholder) return;

  fetch("components/articles.html", { cache: "no-store" })
    .then((res) => res.text())
    .then((html) => {
      placeholder.innerHTML = html;
      renderArticles(window.ARTICLES_DATA || []);
    })
    .catch((err) => console.error("Failed to load articles section:", err));
});
