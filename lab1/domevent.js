import { EventEmitter } from "node:events";
function createDOMElement() {
    //similer to remove event 
    const emitter = new EventEmitter();
    return {
    //similar to addEventListner()
        addEventListner(eventName, callback) {
        },
        //similar to removeEventListner()
    
        removeEventListner(eventName, callback){
        },
        //similar to dispatchEvent()
        dispatchEvent(event) {
        emitter.emit(event.type,event)
    },
};
}
const button = createDOMElement();
button.addEventListner('click', () => {
    console.log("button clicked");
})
function  handleclick(Event){
}
button.addEventListener("click", handleclick)
button.dispatchEvent({
    type: "click",
    detail: "Hello from nde.js",
});