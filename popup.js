// Function to validate the domain
function isValidDomain(domain) {
    // Updated regex to allow valid subdomains and TLDs, but reject single-letter subdomains
    const domainPattern = /^(www\.|[a-zA-Z0-9-]+\.)+([a-zA-Z]{2,})$/;
    return domainPattern.test(domain) && !/^[a-z]\./.test(domain); // Reject single-letter subdomains
}

// Function to normalize and validate the input
function normalizeAndValidate(input) {
    try {
        // Add protocol if missing
        let url = new URL(input.startsWith('http') ? input : `https://${input}`);
        let domain = url.hostname.replace(/^www\./, ''); // Remove 'www' for consistency
        
        // Check for valid domain and reject single-letter subdomains
        if (isValidDomain(domain)) {
            return domain;
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
}



document.getElementById("addBtn").addEventListener("click",()=>{
    const siteName = document.getElementById("siteInput").value.trim();
    if(siteName){
        const site = normalizeAndValidate(siteName);   
        if(site){    
            chrome.storage.sync.get({blockedSites :[]} , (data)=>{
                let blockedSites = data.blockedSites;

                if(!(blockedSites.includes(site))){
                    blockedSites.push(site);

                    chrome.storage.sync.set({blockedSites},()=>{
                        alert(`Great Job You blocked ${site}`);
                        chrome.tabs.create({ url: 'settings.html' });
                    });
                }
                else{
                    alert(`${site} is already blocked`)
                }
            })
        }

        else{
            alert("Please Enter a valid url")
        }
    }
    else{
        alert("Please Enter the URL!!")
    }
})

//When a wants to edit the blocklist

const editButton = document.getElementById("editBlockedSites");
if (editButton) {
    editButton.addEventListener("click", () => {
        chrome.tabs.create({ url: 'settings.html' });
    });
}