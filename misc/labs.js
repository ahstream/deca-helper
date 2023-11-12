// 0

https://twitter.com/search?f=live&q=gm%20(from%3A0xdecaart)%20until%3A2023-12-31%20since%3A2023-01-01&src=typed_query

https://twitter.com/search?f=live&q=gm%20(from%3A0xdecaart)%20until%3A2023-12-31%20since%3A2023-06-01&src=typed_query

https://twitter.com/search?f=live&q=gm%20(from%3A0xdecaart)%20until%3A2023-06-01%20since%3A2023-05-01&src=typed_query

// 1

let twitterArr = [];
let decaArr = [];

// 2

twitterArr = [
  ...new Set(
    [
      ...twitterArr,
      [...new Set([...document.querySelectorAll('div[data-testid="cellInnerDiv"]')].map((x) => x.innerText.match(/\@([a-z0-9_]+)/gi)))]
        .flat()
        .filter((x) => !!x)
        .map((x) => 'https://twitter.com/' + x.replace('@', '')),
    ].flat()
  ),
];

decaArr = [
  ...new Set(
    [
      ...decaArr,
      [
        ...new Set(
          [...document.querySelectorAll('div[data-testid="cellInnerDiv"]')].map((x) => x.innerText.match(/https:\/\/deca.art\/[a-z0-9_\-]*/gi))
        ),
      ]
        .flat()
        .filter((x) => !!x),
    ].flat()
  ),
];

window.scrollBy(0, 3000);

// 3

twitterArr;
decaArr;
console.log(twitterArr.reduce((acc, val) => acc + val + '\n', ''));
console.log(decaArr.reduce((acc, val) => acc + val + '\n', ''));



// new 2023

let decaArr = [];

decaArr = [
  ...new Set(
    [
      ...decaArr,
      [
        ...new Set(
          [...document.querySelectorAll('a')].map(x => x.href).filter(x => x.match(/https:\/\/deca.art\/[a-z0-9_\-]*/gi))
        ),
      ]
        .flat()
        .filter((x) => !!x),
    ].flat()
  )
];

window.scrollBy(0, 3000);

decaArr;

console.log(decaArr.reduce((acc, val) => acc + val + '\n', ''));