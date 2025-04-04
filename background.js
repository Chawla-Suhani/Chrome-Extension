function isCurrentTimeInSchedule(startTime , endTime){
    const now = new Date();
    const currentMinutes = now.getHours() *60 + now.getMinutes();

    const startHours = Number(startTime.split(':')[0]);
    const startMinutes = Number(startTime.split(':')[1]);

    const endHours = Number(endTime.split(':')[0]);
    const endMinutes = Number(endTime.split(':')[1]);

    const startTotalMinutes = startHours * 60 + startMinutes;

    const endTotalMinutes  = endHours * 60 + endMinutes;

    return currentMinutes >= startTotalMinutes && currentMinutes <= endTotalMinutes;

}

chrome.storage.onChanged.addListener((changes) => {
    if (changes.blockedSites) {
        blockedSites = changes.blockedSites.newValue || [];
        //console.log('Blocked sites list updated:', blockedSites);
    }
});



console.log("hmm")

function checkSchedule(){
    chrome.storage.sync.get(['schedule','blockedSites'],(result)=>{
        if(result.schedule){
            const {start : startTime , end : endTime} = result.schedule;
            // console.log(startTime , endTime)
            // console.log(result.blockedSites)


            if(isCurrentTimeInSchedule(startTime , endTime)){
                //console.log('CurrentTime is within the schedule Time');
                monitorTabs(result.blockedSites || []);
            }
            else{
                //console.log('Current Time is not within the scheduled time');
                //monitorTabs(result.blockedSites || []);
            }
        }
        else{
            console.log('No schedule found in storage')
        }
    });
}

function monitorTabs(blockedSites){
    chrome.storage.local.get('originalSites', (data) => {
        originalSites = data.originalSites || {};
    });
    chrome.tabs.onUpdated.addListener((tabId,changeInfo,tab)=>{
        if(changeInfo.url){
            const url = new URL(changeInfo.url);
            const parts = url.hostname.split('.');
            const hostName = parts.slice(-2).join('.');
            
            if(blockedSites.includes(hostName)){
                if(!originalSites[hostName]){
                    originalSites[hostName] = changeInfo.url;
                    //console.log(originalSites);
                    chrome.storage.local.set({ originalSites });
                }
                chrome.tabs.update(tabId,{
                    url:chrome.runtime.getURL(`ui.html?site = ${encodeURIComponent(hostName)}`)
                })
            }else{
                //If the site is removed from blockedSites and it was redirected previously
                console.log("aaya")
                //console.log(originalSites)
                if(originalSites[hostName]){
                    //only restore if this specific site is no longer blocked
                    console.log("aaya")
                        chrome.tabs.update(tabId,{
                            url : originalSites[hostName]
                        });
                        
                        //console.log(originalSites[hostName])
                        //Clean up after restoring
                        delete originalSites[hostName];
                        chrome.storage.local.set({ originalSites });
                }
            }
        }
    })
}

//create an alarm to run every 30 seconds
chrome.alarms.create('checkSchedule',{
    periodInMinutes : 0.0
});

chrome.alarms.onAlarm.addListener((alarm) =>{
    if(alarm.name == 'checkSchedule'){
        checkSchedule();
    }
})
