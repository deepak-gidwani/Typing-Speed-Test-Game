const typingText = document.querySelector(".typing-text p"),
inputField = document.querySelector(".wrapper .input-field "),
mistakeTag = document.querySelector(".mistake span"),
timeTag = document.querySelector(".time span b"),
wpmTag = document.querySelector(".cpm span"),
cpmTag = document.querySelector(".wpm span"),
tryAgainBtn = document.querySelector("button");

let charIndex=0,
mistakes=0,
timer,
maxTime = 60,
timeLeft = maxTime,
isTyping = false;

function randomParagraph(){
    let randomIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    paragraphs[randomIndex].split("").forEach(char =>{  // splitting all the array elements
        let spanTag = `<span>${char}</span>`;
        typingText.innerHTML += spanTag;    // adding each character insider span tag
    });
    document.addEventListener("keypress",()=> inputField.focus());
    typingText.addEventListener("click", ()=> inputField.focus());
}

function inittyping() {
    const characters = typingText.querySelectorAll("span");
    let typedChar = inputField.value.split("")[charIndex];
    if(charIndex < characters.length -1 && timeLeft > 0){
        if(!isTyping){    // once timer is start it wont restart again on every key pressed
            timer = setInterval(initTimer,1000);
            isTyping=true;
        }
        // if typedchar matches with shown char then add correct class else add incorrect class
        if(typedChar == null){
            characters[charIndex].classList.remove("active");
            charIndex--;
            if(characters[charIndex].classList == "incorrect"){
                mistakes--;
                mistakeTag.innerText = mistakes;
            }
            characters[charIndex].classList.remove("correct","incorrect");
    
        }
        else{
            if(characters[charIndex].innerText === typedChar){
                characters[charIndex].classList.add("correct");
            }
            else{
                mistakes++;
                mistakeTag.innerText =  mistakes;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }
        // characters.forEach(span => span.classList.remove("active"));
        characters[charIndex-1].classList.remove("active");
        characters[charIndex].classList.add("active");
    
        let wpm = Math.round((((charIndex - mistakes)/5)/(maxTime - timeLeft)) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        wpmTag.innerText = wpm;
        cpmTag.innerText = charIndex - mistakes;
    }
    else{
        inputField.value="";
        clearInterval(timer);
    }
}
// timer
function initTimer(){
    if(timeLeft>0){
        timeLeft--;
        timeTag.innerText = timeLeft;
    }
    else{
        clearInterval(timer);
    }
}

function resetGame(){ 
    randomParagraph();
    inputField.value="";
    clearInterval(timer);
    timeLeft=maxTime;
    charIndex  = mistakes = isTyping = 0;
    timeTag.innerText = timeLeft;
    wpm.innerText = 0;
    cpmTag.innerText = 0;
}

randomParagraph();
inputField.addEventListener("input", inittyping);
tryAgainBtn.addEventListener("click",resetGame);

