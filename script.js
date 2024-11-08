const btn = document.querySelector("#btn")
const content = document.querySelector("#content")
const voice =document.querySelector("#voice")

function speak(text){
    let text_speak = new SpeechSynthesisUtterance(text)
    text_speak.lang = "en-IN"
    text_speak.rate = 1
    text_speak.pitch = 1
    text_speak.volume = 1
    window.speechSynthesis.speak(text_speak)
}

function wishMe(){
    let day = new Date()
    let hours = day.getHours()
    
    if(hours >= 0 && hours < 12){
        speak("Good Morning Sir")
    }
    else if(hours >= 12 && hours < 16){
        speak("Good afternoon sir");
    }
    else{
        speak("Good Evening sir");
    }
}
    window.addEventListener("load",()=>{
    wishMe()
})

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

let recognization = new speechRecognition()
    recognization.onresult = (event)=>{
    let currentIndex = event.resultIndex
    let transcript = event.results[currentIndex][0].transcript
    content.innerText = transcript
    takeCommand(transcript.toLowerCase())
}

btn.addEventListener("click",()=>{
    recognization.start();
    btn.style.display ="none"
    voice.style.display ="block"

})

function takeCommand(message){
    btn.style.display="flex";
    voice.style.display ="none"
    
    if(message.includes("hello") || message.includes("hi")){
        speak("Hello sir, How can i help you today? ");
    }
    else if (message.includes("how are you")) {
        speak("Fine sir. I'm here to assist you. Thank you for asking!");
    }
    else if(message.includes("who are you") || message.includes("what is your name") || message.includes("who developed you") || message.includes("who made you")){
        speak(" My name is Rosie ,i am virtual assistant ,created by engineer subho sir.");
    }
    else if (message.includes("how can you help me?")) {
        speak("I can help with a variety of tasks like opening websites, telling you the time and date, answer questions, and much more!");
    }
    else if(message.includes("open google")){
        speak("opening google");
        window.open("https://www.google.com");
      }
    else if(message.includes("open youtube")){
        speak("opening youtube");
        window.open("https://www.youtube.com");
      }
    else if(message.includes("open instagram")){
        speak("opening instagram");
        window.open("https://www.instagram.com");
      }
    else if(message.includes("open facebook")){
        speak("opening facebook");
        window.open("https://www.facebook.com");
      }
    else if(message.includes("open linkedin")){
        speak("opening linkedin");
        window.open("https://www.linkedin.com");
      }
    else if (message.includes("you are great") || message.includes("you are just amazing") || message.includes("you are amazing")) { 
        speak("Thank you ,I’m here to make things easier for you.");
    }
    else if (message.includes("how you are working?")) { 
        speak("I use advanced AI to process your commands and perform tasks for you, like searching the web or opening apps");
    }
    else if (message.includes("music")) {
        speak("I can’t play music directly, but you can open YouTube or your favorite music app to start listening.");
    }
    else if(message.includes("time")){
        let time = new Date().toLocaleString(undefined,{hour:"numeric",minute:"numeric"});
        speak(time)
      }
    else if(message.includes("date")){
        let date= new Date().toLocaleString(undefined,{day:"numeric",month:"short",year:"numeric"});
        speak(date)
      }
    else {
         let finalText ="This is what i found on internet regarding" + message.replace("ezze","") || message.replace("izze","")
        speak(finalText)
        window.open(`https://www.google.com/search?q=${message.replace("rosie","")}`,"_blank");
   }
}