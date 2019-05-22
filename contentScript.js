chrome.storage.local.get("infiniteMode", function(result){
    if(result.infiniteMode === true){
        infiniteScrolling();
    }
});
function infiniteScrolling(){
    let url_split = window.location.href.split("/");
    //makes sure that the current reddit page is the home page or a subreddit
    if (url_split[3] === "" || (url_split[3] === "r" && (url_split[5] === "" || url_split[5].includes("count"))) || url_split[3].includes("count")) {
        console.log("Im in");
        //changes the overflow style property
        let betterStyle = document.createElement("style");
        betterText = ".rank {overflow: visible !important;}";
        betterStyle.appendChild(document.createTextNode(betterText));
        let ref = document.querySelector('script');
        ref.parentNode.insertBefore(betterStyle, ref);
        //actual stuff now
        var nav_buttons = document.getElementsByClassName("nav-buttons").item(0);
        var next_button = document.getElementsByClassName("next-button").item(0).children[0];
        let ticking = false;
        var fetchContent = function () {
            if (ticking === false) {
                ticking = true;
                if (nav_buttons.offsetTop - window.scrollY - window.innerHeight < 1000) {
                    fetch(next_button.href, {
                        credentials: 'include',
                    })
                        .then(function (response) {
                            return response.text();
                        })
                        .then(function (text) {
                            nav_buttons.remove();
                            let parser = new DOMParser();
                            let doc = parser.parseFromString(text, "text/html");
                            let siteTable = doc.getElementById("siteTable");
                            let nodeList = Array.from(siteTable.childNodes);
                            //The map function is the actual adding of content!
                            nodeList.map(node => document.getElementById("siteTable").appendChild(node));
                            nav_buttons = document.getElementsByClassName("nav-buttons").item(0);
                            next_button = document.getElementsByClassName("next-button").item(0).children[0];
                            ticking = false;
                        });
                }
                else {
                    ticking = false;
                }
            }
        };
        window.addEventListener("scroll", fetchContent);
        document.body.onload = fetchContent;
    }
    // let divRegExp = /(?=(<div id="siteTable")).*?<\/span>(<\/div>){2}/;
}
