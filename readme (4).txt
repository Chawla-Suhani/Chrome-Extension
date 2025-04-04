manifest.json

{
    "manifest_version" : 3,
    "name" : "Social media blocker",
    "version" : "0.0.1",
    // In content_script we have to pass an array which contain different content_script such as js files that u want to be listening to
    "content_script" : [
        {
            //url that i wnat my application to be functional on
            "matches" : ["<all_urls>"],
            //JS fie that we want to run when our extenion is running i.e entry point of our extension
            "js" : ["content.js"]
        } 
    ],

    //specify which html files we want to run
    

}



//code for storing and blocking the site
            // chrome.storage.sync.get({blockedSites :[]} , (data)=>{
            //     let blockedSites  = data.blockedList;

            //     if(!(blockedSites.includes(site))){
            //         blockedSites.push(site);
            //         chrome.storage.sync.set({blockedSites} , ()=>{
            //             alert(`${site} has been blocked`);
            //         })   
            //     }
            //     else {
            //         alert(`${site} is already blocked`);
            //     }
// })