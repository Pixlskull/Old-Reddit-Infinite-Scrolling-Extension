chrome.storage.local.get("oldRedditMode", function(result){
    if(result.oldRedditMode === true){
        chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
            if (changeInfo.hasOwnProperty("url")) {
                const url = changeInfo.url;
                const domainRegExp = /www.reddit/;
                const contentRegExp = /:\/\/(?:www[1-9]?\.)?(.[^\:]+)/;
                if (domainRegExp.test(url)){
                    const noWWW = url.match(contentRegExp);
                    const newUrl = "https://old." + noWWW[1];
                    chrome.tabs.update(tabId, {url: newUrl});
                }
            }
        });
    }
});

