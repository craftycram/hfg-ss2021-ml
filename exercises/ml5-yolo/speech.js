/*
var synth = window.speechSynthesis;
var utterThis = new SpeechSynthesisUtterance('hello world!');
utterThis.pitch = 1.5;
utterThis.lang = 
synth.speak(utterThis);
*/

window.speechSynthesis.speak(new SpeechSynthesisUtterance('hello world!'));