const createElements=(arr)=>{
  const htmlelements=arr.map((el)=>`<span class="btn">${el}</span>`)

  return htmlelements.join(" ");
};


// voice
function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

const manageSpinner=(status)=>{
if(status==true){
  document.getElementById("spinner").classList.remove("hidden");
  document.getElementById("word-container").classList.add("hidden");
}
else{

    document.getElementById("word-container").classList.remove("hidden");
  document.getElementById("spinner").classList.add("hidden");
}

}

const loadLessions=()=>{
    fetch('https://openapi.programming-hero.com/api/levels/all')
    .then(res=>res.json())
    .then((json)=>display(json.data))
};

const removeActive=()=>{//problem
  const lessonButtons=document.querySelectorAll(".lesson-btn");
  lessonButtons.forEach(btn=>btn.classList.remove("active"));
};

const loadLevelWord=(id)=>{
  manageSpinner(true);

const url=`https://openapi.programming-hero.com/api/level/${id}`;
fetch(url)
.then(res=>res.json())
.then((data)=>{

    removeActive();
    const clickBtn=document.getElementById(`lesson-btn-${id}`);
    console.log("clickBtn");
   clickBtn.classList.add("active");

    displayLevelWord(data.data);
})

};
const loadWordDetail=async(id)=>{
  const url=`https://openapi.programming-hero.com/api/word/${id}`;
  const res=await fetch(url);
  const details=await res.json();
  displayWordDetails(details.data);
}
const displayWordDetails=(word)=>{
 const detailsbox=document.getElementById("details-container");
//console.log(word);
 detailsbox.innerHTML=`
 
 <div class="text-2xl font-bold">
      <h2>${word.word} (<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})</h2>
     </div>
     
     <div class="text-2xl 
      ">
      <h2 class="font-bold">Meaning</h2>
      <p class="">${word.meaning}</p>
      </div>
      
      <div class="text-2xl 
      ">
      <h2 class="font-bold">Example</h2>
      <p class="">${word.sentence
      }</p>
      </div>
      
      <div class="text-2xl 
      ">
      <h2 class="font-bold">সমার্থক শব্দ গুলো</h2>
      <div class="">
      ${createElements(word.synonyms)}
      </div>

      </div>
`

 document.getElementById("my_modal_5").showModal();

}
 
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
   `;
    manageSpinner(false);
    return;
}

words.forEach(word => {
    
console.log(word);
    const card=document.createElement("div");
    card.innerHTML=`
     <div class="bg-white rounded-xl shadow-sm text-center py-20 px-5 space-y-4">
  <h2 class="font-bold text-2xl">${word.word ? "":"আমি শব্দ খুঁজে পাচ্ছি না।"}</h2>
  <p class="text-2xl font-semibold">${word.word}</p>
  <div class="text-2xl font-medium ">${word.meaning?word.meaning :`<span class="text-red-400" >"শব্দের অর্থ খুঁজে পাইনি"</span>`} /${word.pronunciation ? word.pronunciation: `<span class="text-red-400" >"উচ্চারণ খুঁজে পাইনি"</span>`}</div>

  <div class="flex justify-between items-center">
    <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button> 
    
    <button onclick="pronounceWord('${word.word}')" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
  </div>
  </div>
    `;
    wordcontainer.append(card);

 });   
  manageSpinner(false);
};



 display=(lessons)=>{
const levelContainer = document.getElementById("level-container")
levelContainer.innerHTML=""
for(let lesson of lessons ){
    console.log(lesson);
    const btnDiv =document.createElement("div")
    btnDiv.innerHTML=`
                <button id="lesson-btn-${lesson.level_no}" onclick=loadLevelWord(${lesson.level_no}) class="btn btn-outline btn-primary lesson-btn">
     <i class="fa-solid fa-book-open"></i>Lesson-${lesson.level_no}
     </button>
      
    `
    levelContainer.append(btnDiv);
}


};


loadLessions();


document.getElementById("btn-search").addEventListener("click",()=>{
removeActive();
  const input=document.getElementById("input-search");
const searchValue=input.value.trim().toLowerCase();
console.log(searchValue);

fetch("https://openapi.programming-hero.com/api/words/all")
.then((res)=>res.json())
.then((data)=>{
const allwords=data.data;
//console.log(allwords);
const filterWords=allwords.filter((word)=>word.word.toLowerCase().includes(searchValue));

displayLevelWord(filterWords);

});

})