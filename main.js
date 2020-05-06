const puppeteer = require('puppeteer');
const fs = require('fs');
 
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
    if(urlsFlaD != 1){
        try{

    await page.goto(urlsFlaD[i]);

    await page.waitFor(1000);            
   
    pageContent.title1 = await page.evaluate(()=>{
        const temp = document.querySelector('h1.content-head__title').innerText;
        return temp;
    })
   
    pageContent.title2 = await page.evaluate(()=>{
        const temp = document.querySelector('h2').innerText;
        return temp;
    })
   
    pageContent.pubFrom = await page.evaluate(()=>{
        const temp = document.querySelector('p.content-publication-data__from').innerText;
        return temp;
    })
   
    pageContent.pubTime = await page.evaluate(()=>{
        const temp = document.querySelector('p.content-publication-data__updated').innerText;
        return temp;
    })
   
    
    pageContent.textCont = await page.evaluate(()=>{
        var temp = document.querySelectorAll('p.content-text__container');
        var par = [].map.call(temp, (el)=>{
            return el.innerText;
        })
        return par;
    })
   
    fs.writeFileSync(`/home/pacheco/Área\ de\ Trabalho/FlaNews/noticia${ind}.json`,JSON.stringify(pageContent, null, 1));

    console.log(`Noticia${ind} salvo`);

    ind++;
        }catch(err){
           
        }
}
    
}

for(let i = 0; i <= urlsFla.length ; i++ ){
    if(urlsFla[i] !== 1){
    try{

      await page.goto(urlsFla[i]);

      await page.waitFor(1000);            
   
    pageContent.title1 = await page.evaluate(()=>{
        const temp = document.querySelector('h1.content-head__title').innerText;
        return temp;
    })
   
    pageContent.title2 = await page.evaluate(()=>{
        const temp = document.querySelector('h2').innerText;
        return temp;
    })
   
    pageContent.pubFrom = await page.evaluate(()=>{
        const temp = document.querySelector('p.content-publication-data__from').innerText;
        return temp;
    })
   
    pageContent.pubTime = await page.evaluate(()=>{
        const temp = document.querySelector('p.content-publication-data__updated').innerText;
        return temp;
    })
   
    
    pageContent.textCont = await page.evaluate(()=>{
        var temp = document.querySelectorAll('p.content-text__container');
        var par = [].map.call(temp, (el)=>{
            return el.innerText;
        })
        return par;
    })
   
    fs.writeFileSync(`/home/pacheco/Área\ de\ Trabalho/FlaNews/noticia${ind}.json`,JSON.stringify(pageContent, null, 1));
    
    console.log(`Noticia${ind} salvo`);

    ind++;
  }catch(err){
   
  }

  }
  }

 console.log('Todas as noticias salvas.');
 await browser.close();

})();