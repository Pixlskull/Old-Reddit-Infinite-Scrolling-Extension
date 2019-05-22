document.getElementById("oldModeButton").addEventListener("click", function() {
    chrome.storage.local.get("oldRedditMode", function(result){
        if (result.oldRedditMode === true){
            oldRedditState.textContent = "Old Reddit Mode: Off";
        }
        else{
            oldRedditState.textContent = "Old Reddit Mode: On";
        }
        chrome.storage.local.set({ "oldRedditMode": !result.oldRedditMode});
    });
});

document.getElementById("infiniteButton").addEventListener("click", function() {
    chrome.storage.local.get("infiniteMode", function(result){
        if (result.infiniteMode === true){
            infiniteState.textContent = "Infinite Scrolling: Off";
        }
        else{
            infiniteState.textContent = "Infinite Scrolling: On";
        }
        chrome.storage.local.set({ "infiniteMode": !result.infiniteMode});
    });
});
chrome.storage.local.get("oldRedditMode", function(result){
    if (result.oldRedditMode === true){
        oldRedditState.textContent = "Old Reddit Mode: On";
    }
    else{
        oldRedditState.textContent = "Old Reddit Mode: Off";
    }
});
chrome.storage.local.get("infiniteMode", function(result){
    if (result.infiniteMode === true){
        infiniteState.textContent = "Infinite Scrolling: On";
    }
    else{

        infiniteState.textContent = "Infinite Scrolling: Off";
    }
});
const oldRedditState = document.getElementById("oldRedditState");
const infiniteState = document.getElementById("infiniteActivationState");