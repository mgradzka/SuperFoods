

let id = getPageIdFromUrl();
// Calling the International recipes
function getInternationalRecipes() {
  fetch("https://marekfurik.com/wp-json/wp/v2/posts?&tags=9")
    .then((response) => response.json())
    .then((data) => {
      drawInternationalSection(data);

    });
}
getInternationalRecipes();

// Drawing International Section on the homepage
function drawInternationalSection(data) {
  for (let i = 0; i < 3; i++) {
    let cardInt = `
        <article>
            <a href="?pageId=${data[i].id}">
                <img class="teaser-img" src="${data[i].acf.introduction.image}" alt="">
                <h4>${data[i].acf.introduction.name}</h4>
                <p>${data[i].acf.introduction.teaser}</p>
            </a>
        </article>
        `;
    drawHtml("div#international", cardInt);
  }
}

// Calling the Pasta recipes
function getPastaRecipes() {
  fetch("https://marekfurik.com/wp-json/wp/v2/posts?&tags=10")
    .then((response) => response.json())
    .then((data) => {
      //   Looping through the posts to find all the ACF of the recipes and putting them all in an array
      
      drawPastaSection(data);

    });
}
getPastaRecipes();

// Drawing Pasta Section on the homepage
function drawPastaSection(data) {
  for (let i = 0; i < 3; i++) {
    let cardPasta = `
        <article>
            <a href="?pageId=${data[i].id}">
                <img class="teaser-img" src="${data[i].acf.introduction.image}" alt="">
                <h4>${data[i].acf.introduction.name}</h4>
                <p>${data[i].acf.introduction.teaser}</p>
            </a>
        </article>
                        `;
    drawHtml("div#pasta", cardPasta);
  }
}

// Calling the Articles
function getArticle() {
  fetch("https://marekfurik.com/wp-json/wp/v2/posts?categories=25")
    .then((response) => response.json())
    .then((data) => {
      //   Looping through the posts to find all the ACF of the recipes and putting them all in an array
      let articles = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i].acf != -1) {
          articles.push(data[i].acf);
        }
      }
      drawArticleSection(articles);
      console.log(articles);
    });
}
getArticle();

// Drawing Article Section on the homepage
function drawArticleSection(articles) {
  let articleCard = `
        
            <div>
                <img class="article-img" src="${articles[1].introduction.image}" alt="">
            </div>

            <div class="flex flex-column article-content">
                <h3>${articles[1].introduction.name}</h3>
                <p>${articles[1].introduction.teaser}</p>
                <a href="article.html" class="btn">All articles</a>
            </div>
        
        `;
  drawHtml("div#article", articleCard);
}

// getting id from the url
function getPageIdFromUrl() {
  let id = 0;
  const url = window.location.href;
  if (url.indexOf('pageId') != -1) {
      const urlSplit = url.split('?');
      if (urlSplit[1].indexOf('&') == -1) {
          const parameterSplit = urlSplit[1].split('=');
          id = parameterSplit[1];
      } else {
          const urlParameters = urlSplit[1].split('&');
          for (let i = 0; i < urlParameters.length; i++) {
              if (urlParameters[i].substring(0, 6) == 'pageId') {
                  const pageIdSplit = urlParameters[i].split('=');
                  id = pageIdSplit[1];
                  break;
              }
          }
      }
  }
  console.log(url);
  return id;
}
displayingEachRecipeOnTheIndex()
function displayingEachRecipeOnTheIndex() {
  let idNumber = id;
  switch (id) {
      case '247':
         drawRecipeHome(idNumber)
          break;
      case '245':
         drawRecipeHome(idNumber)
          break;
      case '243':
         drawRecipeHome(idNumber)
          break;
      case '222':
         drawRecipeHome(idNumber)
          break;
      case '186':
         drawRecipeHome(idNumber)
          break;
      case '182':
         drawRecipeHome(idNumber)
          break;


  }
}
 function drawRecipeHome(idNumber) {
   clearHtml()
   const section = `
   <section id="#recipes-placeHolder"></section>
   `;
   drawHtml('main', section)
   getRecipeByIdonHome(idNumber)
 }

 function getRecipeByIdonHome(idNumber) {
  fetch(`https://marekfurik.com/wp-json/wp/v2/posts/${idNumber}`)
      .then((response) => response.json())
      .then((data) => {
            drawRecipePageOnHome(data)
         
      });

}
function drawRecipePageOnHome(data) {
  const recipe = data.acf;
  const content = `
  <div class="flex recipe-test">  
      <h1>${recipe.introduction.name}</h1>
      <a href="${recipe.metadata.link_for_creator}" target="_blank"><cite>Author: ${recipe.metadata.author}</cite></a>

      <div class="single-recipe-div1 flex">
          <img src="${recipe.introduction.image}" alt="${recipe.introduction.name}" class="recipe-img-size" />
          <article>
          <h4>About</h4>
          <p>${recipe.metadata.about}</p>

          <h4>Yield</h4>
          <p>${recipe.metadata.portion}</p>
          </article>
      </div>
      
      <div class="img-wrapper">
      <img class="svg" src="assets/pictures/Asset-2.svg" />
      </div>
      <div class="directons-recipe flex">
          <h2><span>Directions</span></h2>
      </div>
      
      <div class="directions-main flex">
          <div class="ingredients flex">
              
                  <table>
                  <h3>Ingredients</h3>
                  <ul class="flex">
                      ${ingredients(data)}
                  </ul>
                  </table>
          
                  </div>
                  
                  <div class="steps flex">
                  ${steps(data)}
                  </div>
                  </div>
                  
                  <div class="share flex">
                     <div class="share flex"> 
                      <p>Do you like this recipe? Share it!</p>
                     </div>
                      <div class="recipe-icons flex">
                          <i class="fa-brands fa-twitter"></i>
                          <i class="fa-brands fa-facebook"></i>
                          <i class="fa-brands fa-instagram"></i>
                      </div>
                  </div>
   
    <div class="img-wrapper"><a href="internationalCuisine.html" class="btn">Back to the category</a></div>
  </div>
  `;
  drawHtml('section', content)

}
function clearHtml() {
  const bodyDoc = document.querySelector('main');
  bodyDoc.innerHTML = '';
}

//Adding content to the Html
function drawHtml(selector, newContent) {
  document.querySelector(selector).innerHTML += newContent;
}

