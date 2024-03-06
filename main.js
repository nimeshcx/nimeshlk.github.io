document.getElementById('jd').onclick = ()=>{
    window.open('https://discord.gg/ju4yQBfQ7p')
  }
  
 
  
  /*document.getElementById('ow').onclick = ()=>{
    window.open('https://www.buymeacoffee.com/mygx')
  }*/
  let isimg = false
if(isimg == true){
  img = document.getElementById('hehe')
img.addEventListener("click", function() {
    var imageUrl = this.src;
    window.open(imageUrl, "_blank");
});
}
  let dialog = document.getElementById('dialog')
  let openbtn = document.getElementById('Advance Setting')
  let closebtn = document.getElementById('close')
  openbtn.onclick = ()=>{
    dialog.show()
    document.getElementById('imshow').style.border = '0px solid black transparent'
  }
  closebtn.onclick= ()=>{
    dialog.close()
    document.getElementById('imshow').style.background = 'linear-gradient(black, black) padding-box,linear-gradient(to right, red, blue) border-box' 
  }
  let inp = document.getElementById('inp')
  let np = document.getElementById('np')
  let gd = document.getElementById('gds')
  let step = document.getElementById('step')
  let seed = document.getElementById('seed')
  let seedp = document.getElementById('seedp')
  let stepp = document.getElementById('stepp')
  let gdsp = document.getElementById('gdsp')
  let btn = document.getElementById('create')
  gd.addEventListener('input',()=>{
   gdsp.innerText = gd.value
  })
  step.addEventListener('input',()=>{
   stepp.innerText = step.value
  })
  seed.addEventListener('input',()=>{
   seedp.innerText = seed.value
  })
  isFumes = true
  let prompt = 'CINEMATIC'
  let nps = ' ,(bad hands, bad anatomy, bad body, bad face, bad teeth, bad arms, bad legs, deformities:1.3),poorly drawn,deformed hands,deformed fingers,deformed faces,deformed eyes,mutated fingers,deformedbody parts,mutated body parts,mutated hands, disfigured,oversaturated,bad anatom,cropped, worst quality, low quality, jpeg artifacts, ugly, duplicate, morbid, mutilated, out of frame, extra fingers, mutated hands, poorly drawn hands, poorly drawn face, mutation, deformed, blurry, dehydrated, bad anatomy, bad proportions, extra limbs, cloned face, disfigured, gross proportions, deformed limbs, missing arms, missing legs, extra arms, extra legs, fused fingers, too many fingers, long neck,deformed eyes'
let reload = false
  
  document.getElementById('styles').onchange = ()=>{
    const selectedStyle = document.querySelector('input[name="style"]:checked');
    if(selectedStyle.value =='photo'){
      
      prompt = 'PHOTOGRAPHY'
    
    
    }
    if(selectedStyle.value == 'cinema'){
    
      prompt = "CINEMATIC"}
    if(selectedStyle.value == 'fantasy'){
   
      prompt = "CREATIVE"
    }

    if(selectedStyle.value == 'fumes'){
    
       prompt = 'FILM'
}
    if(selectedStyle.value == 'no'){
      prompt = 'LEONARDO'
     
    }
  }
setTimeout(()=>{
  reload = true
},2000000)

btn.onclick = ()=>{


if(btn.innerText == 'CANCEL'){
  window.location.reload()
}


}



  btn.onclick = async ()=>{ 
btn.innerText = "CANCEL"
let div = document.getElementById('imshow');
    if(reload==true){
      window.location.reload();
    }
    isimg = false
    let isc = false
    let id = ''


  

  
  negative_prompt = nps
  btn.disabled = true
  div.innerHTML = '';
  document.getElementById('imshow').innerHTML = ''
  let pi = document.createElement('h5')
  pi.innerText = 'Generating Image... Estimated Time: 20s'
 // document.getElementById('imshow').append(pi)
  let count = 0;
  seed = seed




let progress = document.createElement('progress');
progress.value = 1;
progress.max = 100;

div.appendChild(progress);
setInterval(()=>{
progress.value+=3},1100)

    

    async function generate(){
    cookie = localStorage.getItem("cookie")
    u = localStorage.getItem("u")
    sub = localStorage.getItem("sub")
    if(cookie == null){
        cookie = ''
    }
    if(cookie == "undefined"){
        cookie = ''
    }
      params={
      
      'prompt': inp.value,
      'nprompt': np.value,
      "steps": step.value,
      'gd': gd.value,
      "style": prompt,
      "width": 1024,
   "height":1024,
   "alchemy":true,
   "pr":true
        
   
  };

   
       try {
           const response = await fetch('https://l-d83c.onrender.com/leonardo', {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json',
                   'Connection': 'keep-alive',
               },
               body: JSON.stringify(params)
           });
           if (response.status ===  429) {
             pi.innerText = 'you have reached your limit of 50 generation per hour, you will get 50 more image generaions after an hour!!'
           }
       /*    console.log(np.value)
           const imgData = await response.text(); 
           const div = document.getElementById('imshow')
           const img = document.createElement('img');
           pi.innerHTML = ''
           pi.innerText = ''
           img.src = imgData;
           div.appendChild(img);
           */
           
           const data = await response.json(); 
           localStorage.setItem("cookie", data.token);
           localStorage.setItem("sub", data.sub);
           localStorage.setItem("u", data.u);
           console.log(data.result)
         progress.innerHTML = ''
         progress.style.display = 'none';
           const img = document.createElement('img');
           img.id = "hehe"
           pi.innerHTML = ''
           pi.innerText = ''
           img.src = data.result[2];
         img.id = "i1"
           div.appendChild(img);
          const img2 = document.createElement('img');
          img2.src = data.result[1];
           div.appendChild(img2);
           btn.disabled = false
           isimg = true
           
       } catch (error) {
         btn.disabled = false
           console.error('An error occurred:', error);
           pi.innerText = 'An error occurred, try changing your prompt';
       }
   
   
   }
   
   await Promise.all([generate()]);
   

 
  
}