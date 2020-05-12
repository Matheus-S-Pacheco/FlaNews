module.exports = async function(urlsFla , page, callback){

    pageContent = new Object(); 

    if(urlsFla != 1){

    try{

     await page.goto(urlsFla);

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

     callback = pageContent;
     return callback;
   
    }catch(err){
           
    }
}
    
};
