const loadLessions=()=>{
    fetch('https://openapi.programming-hero.com/api/levels/all')
    .then(res=>res.json())
    .then((json)=>display(json.data))
};
const loadLevelWord=(id)=>{

const url=`https://openapi.programming-hero.com/api/level/${id}`;
fetch(url)
.then(res=>res.json())
.then(data=>displayLevelWord(data.data))

};
 
displayLevelWord=(words)=>{
const wordcontainer=document.getElementById("word-container");
wordcontainer.innerHTML="";

if(words.length==0){
   wordcontainer.innerHTML=`
   <div class="text-center col-span-4 rounded-xl space-y-5 py-10">
    
   <img class="mx-auto" src="alert-error.png">
  <p class="text-[#79716B] text-2xl">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
  <h2 class="font-bold text-4xl">নেক্সট Lesson এ যান</h2>
 </div>
   `
    return;
}

words.forEach(word => {
    
console.log(word);
    const card=document.createElement("div");
    card.innerHTML=`
     <div class="bg-white rounded-xl shadow-sm text-center py-20 px-5 space-y-4">
  <h2 class="font-bold text-2xl">${word.word ? "":"আমি শব্দ খুঁজে পাচ্ছি না।"}</h2>
  <p class="font-semibold">Meaning /Pronounciation</p>
  <div class="text-2xl font-medium ">${word.meaning?word.meaning :`<span class="text-red-400" >"শব্দের অর্থ খুঁজে পাইনি"</span>`} /${word.pronunciation ? word.pronunciation: `<span class="text-red-400" >"উচ্চারণ খুঁজে পাইনি"</span>`}</div>

  <div class="flex justify-between items-center">
    <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button> 
    
    <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
  </div>
  </div>
    `;
    wordcontainer.append(card);

 });   
};



 display=(lessons)=>{
const levelContainer = document.getElementById("level-container")
levelContainer.innerHTML=""
for(let lesson of lessons ){
    console.log(lesson);
    const btnDiv =document.createElement("div")
    btnDiv.innerHTML=`
                <button onclick=loadLevelWord(${lesson.level_no}) class="btn btn-outline btn-primary">
     <i class="fa-solid fa-book-open"></i>Lesson-${lesson.level_no}
     </button>
      
    `
    levelContainer.append(btnDiv);
}


};


loadLessions();