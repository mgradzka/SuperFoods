//Addressing all the navigation

// Getting pageId from th Url
// It is based on Dan Høegh  Sem 2, theme 2 - API 1 lecture
// let pageName = getPageNameFromUrl()

let pageId = getPageIdFromUrl();
let pageName = getPageNameFromUrl ()
function getPageNameFromUrl () {

    const url = window.location.href;
    const urlSplit = url.split('/');
    const pageNameSplit = urlSplit[urlSplit.length - 1].split('.');
    const pageName = pageNameSplit[0]
    return pageName;
    
}
console.log(pageName);
callTheNavNameFromURl()
function callTheNavNameFromURl() {
    const page = pageName;
    switch (page) {
        case 'internationalCuisine':
            drawSite(pageId, international);
            break;

        case 'pasta':
            drawSite(pageId, pasta);
            break;

        case 'seasonal':
            drawSite(pageId, seasonal);
        break;

        case 'soup':
            drawSite(pageId, soup);
        break;

        case 'guestHosting':
            drawSite(pageId, guestHosting);
        break;

        case 'dessert':
            drawSite(pageId, desserts);
        break;

        case 'article':
            drawSite(pageId, article);
        break;


    }
}
// Selecting and seperating the pageId from the other parameters in the Url
function getPageIdFromUrl() {
    let pageId = 0;
    const url = window.location.href;
    if (url.indexOf('pageId') != -1) {
        const urlSplit = url.split('?');
        if (urlSplit[1].indexOf('&') == -1) {
            const parameterSplit = urlSplit[1].split('=');
            pageId = parameterSplit[1];
        } else {
            const urlParameters = urlSplit[1].split('&');
            for (let i = 0; i < urlParameters.length; i++) {
                if (urlParameters[i].substring(0, 6) == 'pageId') {
                    const pageIdSplit = urlParameters[i].split('=');
                    pageId = pageIdSplit[1];
                    break;
                }
            }
        }
    }
    console.log(url);
    return pageId;
}
// Finding the default page by the root property
function drawSite(pageId, page) {
    console.log(pageId)
    if (pageId == 0) {
        for (let i = 0; i < page.length; i++) {
            if (page[i].metaData.rootPage == true) {
                pageId = page[i].id;
                break;
            }
        }
    } if (pageId >= 100) {
        getRecipeById(pageId);
    } else {
        // Calling the recipes by the pageId
        getRecipesByTags(pageId, page)
        console.log(pageId);
        drawSubNav(pageId, page)
        drawEmptyMsg(page)
    }
}
        
// Drawing the Sub-navigation
function drawSubNav(currentPageId, page) {
    if(page.length > 1) {
        let navString = '<ul class="flex">'
        for (let i = 0; i < page.length; i++) {
            if (page[i].metaData.name) {
                let activePage = '';
                if (page[i].id == currentPageId) {
                    activePage = 'id="active"';
                }
                navString += `
                    <a class="btn btn-sub-nav" href="?pageId=${page[i].id}" ${activePage}>${page[i].metaData.name}</a>
                `
            }
        }
        navString += '</ul>'
        drawHtml('#sub-nav', navString);

    }
}

// When there is no recipes in the category

function drawEmptyMsg(page) {
    for(let i = 0; i < page.length; i++) {
        if (page[i].metaData.empty) {
            const content = `
                <div class="no-recipe-page">
                <p class="empty-text"> The recipes pasta-way &#128549; <br/>
                Unfortunately, we cannot find any related recipes in this topic<br/>
                </p>
                 <img src="./assets/pictures/no-recipe.png" alt="https://www.freepik.com/vectors/flat-illustration" id="empty-picture" class="no-recipes">
                </div>
            `;
            
            drawHtml('#recipes-placeHolder', content)
        }
    }
}

// calling the Recipe by tags
function getRecipesByTags(tagNumber) {
    fetch(`https://marekfurik.com/wp-json/wp/v2/posts?&tags=${tagNumber}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            drawRecipes(data)
        });

}

// calling the Recipe by Id
function getRecipeById(pageId) {
    console.log(pageId);
    fetch(`https://marekfurik.com/wp-json/wp/v2/posts/${pageId}`)
        .then((response) => response.json())
        .then((data) => {
                if (data.id < 268 && data.id > 100) {
                    console.log(data);
                    drawRecipePage(data)
                } else {
                    drawArtclePage(data);

                }
        });

}
function drawRecipes(data) {
        let content = ''
        for (let i = 0; i < data.length; i++) {
            content += `
            <article>
            <a href="?pageId=${data[i].id}">
            <img src="${data[i].acf.introduction.image}" alt="" class="teaser-img">
            <h4>${data[i].acf.introduction.name}</h4>
            <p>${data[i].acf.introduction.teaser}</p>
            </a>
            </article>
            `;
            drawHtml('#recipes-placeHolder', content)
        }
}

function drawRecipePage(data) {
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
     
      <div class="img-wrapper"><a href="${pageName}.html" class="btn">Back to the category</a></div>
    </div>
    `;
    drawHtml('#recipes-placeHolder', content)

}

function ingredients(data) {
    const ingredientsItem = Object.values(data.acf.ingredients);
    console.log(ingredientsItem);
    // removing the undefined element

    let list = '';
    for (let i = 0; i < ingredientsItem.length; i++) {
        if (ingredientsItem[i] == undefined || ingredientsItem[i] == '') {
            continue;
        }
        else {
            list += `
            <li>${ingredientsItem[i]}</li>
            <hr></hr>
        `
        }
    }
    return list;
};

function steps(data) {
    let steps = '';
    const stepsItem = Object.values(data.acf.preparation);
    console.log(stepsItem);
    for (let i = 0; i < stepsItem.length; i++) {
        if (stepsItem[i] == undefined || stepsItem[i] == '') {
            continue;
        }
        steps += `
        <h3>Step ${[i + 1]}</h3>
        <p>${stepsItem[i]}</p>
        <hr />
    `
    }

    return steps;
}


// Drawing each Article page
function drawArtclePage(data) {
    console.log(data.acf);
    const article = data.acf;
    const articleContent = `
    <div class="flex recipe-test">
        <h1>${article.introduction.name}</h1>
        <a href="${article.metadata.link_for_creator}" target="_blank"> 
            <cite>Author: ${article.metadata.author}</cite>
        </a>

    <div class="single-recipe-div1 flex">
        <img src="${article.introduction.image}" alt="${article.introduction.name}" class="recipe-img-size" />
        <article class="flex articles-intro">
            <div>
                <h4>Introduction</h4>
                <p>${article.metadata.about}</p>
            </div>
            <div class="flex share articles-share">
                <p>Do you like this article? Share it!</p>
                <div class="flex articles-social">
                    <i class="fa-brands fa-twitter"></i>
                    <i class="fa-brands fa-facebook"></i>
                    <i class="fa-brands fa-instagram"></i>
                </div>
            </div>
        </article>
    </div>

    <div class="directions-main flex">
        <div class="article-div flex">
            ${headingsAndParagraph(data)}
            <p></p>
        </div>
    </div>

    <div class="img-wrapper">
        <a href="article.html" class="btn">Back to the category</a>
    </div>
    </div>
        `;
    drawHtml('#recipes-placeHolder', articleContent)
}

function headingsAndParagraph(data) {
    const headingsItem = Object.values(data.acf.headers);
    const paragraphItmes = Object.values(data.acf.paragraphs);

    console.log(headingsItem);
    console.log(paragraphItmes);
    // removing the undefined element

    let headers;
    for (let i = 0; i < headingsItem.length && paragraphItmes.length; i++) {
        if ((headingsItem[i] && paragraphItmes[i] == undefined) || (headingsItem[i] == '' && paragraphItmes[i] == '')) {
            continue;
        }
        else {
            headers += `
            <h3>${headingsItem[i]}</h3>
            <p>${paragraphItmes[i]}</p>
            <hr></hr>
        `
        }
    }
    return headers;
};


function drawHtml(elementId, newContent) {
    document.querySelector(elementId).innerHTML = newContent;
}

