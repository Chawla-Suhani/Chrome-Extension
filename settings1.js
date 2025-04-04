const blockedSitesList = document.getElementById("blockedSitesList");

// // //Load blocked sites initially
function loadBlockedSites(){
    chrome.storage.sync.get({blockedSites : []} , (data)=>{
        blockedSitesList.innerHTML = '';
        const blockedSites = data.blockedSites;
        alert(blockedSites)
        blockedSites.forEach((site,index)=>{
            displayBlockedSite(site,index);
        })
    })
}

// //Function to display blocked sites
function displayBlockedSite(site, index) {
    const li = document.createElement("li");
    li.className = "site-item";
    li.innerHTML = `
        <span>${site}</span>
        <button class="unblock-btn">Unblock</button>
    `;

    // Attach event listener programmatically
    li.querySelector('.unblock-btn').addEventListener('click', () => removeSite(index));

    blockedSitesList.appendChild(li);
}

function removeSite(index){
    chrome.storage.sync.get({blockedSites : []} , (data)=>{
        let blockedSites = data.blockedSites;
        blockedSites.splice(index,1);
        chrome.storage.sync.set({blockedSites},()=>{
            loadBlockedSites();
        })
    })
}

loadBlockedSites();

/**********************Trial phase********************/

/*************** Schedule Time ****************/

const startTimeInput = document.getElementById("startTime");
const endTimeInput = document.getElementById("endTime");
const saveScheduleButton = document.getElementById("saveSchedule");

// Load existing schedule
chrome.storage.sync.get("schedule", (data) => {
  if (data.schedule) {
    startTimeInput.value = data.schedule.start;
    endTimeInput.value = data.schedule.end;
  }
});

// Save schedule to storage
saveScheduleButton.addEventListener("click", () => {
  // if(isCurrentTimeInSchedule(startTimeInput,endTimeInput)){
  //   alert("haa")
  //   saveScheduleButton.disabled = true;
  // }
  // else{
    saveScheduleButton.disabled = false;
  const schedule = {
    start: startTimeInput.value,
    end: endTimeInput.value
  };

  if (schedule.start && schedule.end) {


    chrome.storage.sync.get("schedule", (data) => {
      if (data.schedule) {
        alert(`Start Time: ${data.schedule.start}`);
        alert(`End Time: ${data.schedule.end}`);
      }
    });



    chrome.storage.sync.set({ schedule }, () => {
      alert("Schedule saved successfully!");

      //✅ Send message to background.js to update rules based on schedule
      //chrome.runtime.sendMessage({ action: "UPDATE_RULES" });
    });
  } else {
    alert("Please enter both start and end time");
  }
//}
});

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
