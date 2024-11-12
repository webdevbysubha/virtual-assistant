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
    else if (message.includes("morning") || message.includes("afternoon") || message.includes("evening")) {
        speak("Thank you. How’s your day going?");
    }
    else if (message.includes("well") || message.includes("fine") || message.includes("good")) {
        speak("Glad to hear it! Anything exciting you're working on today?");
    }
    else if (message.includes("how are you")) {
        speak("Fine sir. I'm here to assist you. Thank you for asking!");
    }
    else if(message.includes("who are you") || message.includes("what is your name") || message.includes("who developed you") || message.includes("who made you")){
        speak(" My name is Rosie ,i am virtual assistant ,created by an engineer subho sir.");
    }
    else if (message.includes("do")) {
        speak("I can help with a variety of tasks like opening websites, telling you the time and date, answer questions, and much more!");
    }
    else if (message.includes("you are great") || message.includes("that's great") || message.includes("you are just amazing") || message.includes("you are amazing")) { 
        speak("Thank you ,I’m here to make things easier for you.");
    }
    else if (message.includes("working")) { 
        speak("I use advanced AI to process your commands and perform tasks for you, like searching the web or opening apps");
    }
    else if (message.includes("music")) {
        speak("I can’t play music directly, but you can open YouTube or your favorite music app to start listening.");
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
    else if(message.includes("time")){
        let time = new Date().toLocaleString(undefined,{hour:"numeric",minute:"numeric"});
        speak(time)
      }
    else if(message.includes("date")){
        let date= new Date().toLocaleString(undefined,{day:"numeric",month:"short",year:"numeric"});
        speak(date)
      }
    else if (message.includes("set an alarm at")) {
        const timePattern = /(\d{1,2}):(\d{2})\s*(AM|PM)?/i;
        const timeMatch = message.match(timePattern);
        if (timeMatch) {
            let hours = parseInt(timeMatch[1], 10);
            const minutes = parseInt(timeMatch[2], 10);
            const period = timeMatch[3] ? timeMatch[3].toUpperCase() : null;
            if (period === "PM" && hours !== 12) hours += 12;
            if (period === "AM" && hours === 12) hours = 0;

            const now = new Date();
            const alarmTime = new Date();
            alarmTime.setHours(hours, minutes, 0, 0);
    
            if (alarmTime <= now) {
                speak("The specified time is in the past. Please set a future time for the alarm.");
            } else {
                const timeDifference = alarmTime - now;
                speak(`Alarm set for ${hours}:${minutes < 10 ? '0' : ''}${minutes} ${period || ''}.`);
    
                setTimeout(() => {
                speak(`This is your alarm! Time's up. The time is ${hours}:${minutes < 10 ? '0' : ''}${minutes}.`);                
                }, timeDifference);
            }
        } else {
            speak("I couldn't understand the time format. Please say the time in hours and minutes, for example, set an alarm at 7:30 AM.");
        }
    }        
    else {
         let finalText ="This is what i found on internet regarding" + message.replace("ezze","") || message.replace("izze","")
        speak(finalText)
        window.open(`https://www.google.com/search?q=${message.replace("rosie","")}`,"_blank");
   }
}