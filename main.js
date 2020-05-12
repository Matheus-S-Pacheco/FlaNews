const puppeteer = require('puppeteer');
const fs = require('fs');
const scraping = require('./scrap');
 
(async () => {
  const browser = await puppeteer.launch({headless : false});
  const page = await browser.newPage();
  await page.goto('https://globoesporte.globo.com/futebol/times/flamengo/');
  
  try{
    
    await page.hover('div.load-more.gui-color-primary-bg');
 
    await page.waitFor(5000);

    await page.hover('div.load-more.gui-color-primary-bg');
  
    await page.waitFor(1000);

  }catch(err){

    console.log('Não existem noticias antigas.')
  
  }

  //links em destaque =>

  const Links1 = await page.evaluate(()=>{
  
    const arr = document.querySelectorAll('a[class="bstn-hl-link"]');
    const arrLinks = [].map.call(arr, (el) =>{
      return el.href;
    })
     
      return arrLinks;
  })
  
  await page.waitFor(1000); 

  const Links2 = await page.evaluate(() => {
    
    const arr = document.querySelectorAll('a[class="feed-post-link gui-color-primary gui-color-hover');
    const arrLinks = [].map.call(arr, (el)=>{
      
        return el.href;
      
    })
    
    return arrLinks;
  });

//Filtra noticias em destaque para retirar paginas com videos ou tweets

const urlsFlaD = [].map.call(Links1, (el) => {
    if(el.toString().includes('/noticia') == true){
      return el;
    }else{
      el = 1;
      return el;
    }
  })

//Filtra as noticias fora de destaque para que só sobrem os links com
//"flamengo/noticia" para retirar os dados .

const urlsFla = [].map.call(Links2, (el) => {
  if(el.toString().includes('flamengo/noticia') == true){
    return el;
  }else{
    el = 1;
    return el;
  }
})


let ind = 1; //indice para impressão do nome do arquivo

var pageContent = new Object();

for(let i = 0; i <= urlsFlaD.length; i++ ){
  
  pageContent = await scraping(urlsFlaD[i], page,(callback)=>{
      return callback;
  }); 

  fs.writeFileSync(`./noticias/noticia${ind}.json`,JSON.stringify(pageContent, null, 1));
    
  console.log(`Noticia${ind} salvo`);

  ind++;
    
}

for(let i = 0; i <= urlsFla.length ; i++ ){
    
  pageContent = await scraping(urlsFla[i], page,(callback)=>{
      return callback;
  });  

   if(pageContent != undefined){
  fs.writeFileSync(`./noticias/noticia${ind}.json`,JSON.stringify(pageContent, null, 1));
    
  console.log(`Noticia${ind} salvo`);

  ind++;
   }
  
}

 console.log('Todas as noticias salvas.');
 await browser.close();

})();
