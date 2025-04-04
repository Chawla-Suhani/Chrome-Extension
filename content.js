//now this alert message will be geerate every time we visit any web page 
//alert("Hey!!")

// so if actual url include some sort of social media host 
/*if(window.location.hostname == "www.youtube.com"){
    alert("you are in youtube")
}*/


const generateHTML = (pageName) => {
    
    return `<div class="container">
        <div class="header">
            <span class="shield-icon">🚫</span>
            <span class="header-text">This site is blocked by BlockSite</span>
        </div>
        <div class="content">
            <h1>Nice try…</h1>
            <p>You put <strong>instagram.com</strong> in your Block Sites list. It’s probably there for a reason.</p>
            <button class="password-btn">🔒 Password Protection</button>
            <div class="popup">
                <div class="badge">⭐ NEW!</div>
                <h3>Get unlimited block list!</h3>
                <p>Don't get distracted by shortlisting. Add as many sites as you like.</p>
                <button class="unlimited-btn">Go Unlimited</button>
            </div>
        </div>
        <div class="dog-image"></div>
        <button class="customize-btn">⚙️ Customize Page</button>
    </div>
 `
}

const generateSTYLE = () =>{
    
    return `<style>@import url(https://fonts.googleapis.com/css?family=opensans:500);
  /* General Styling */
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
}

/* Container */
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px;
    background: #ddd;
    height: 100vh;
    background-image: url('https://source.unsplash.com/1600x900/?dog'); /* Background image of a dog */
    background-size: cover;
    background-position: center;
}

/* Header */
.header {
    display: flex;
    align-items: center;
    background-color: #e74c3c;
    color: #fff;
    padding: 8px 16px;
    border-radius: 20px;
    margin-bottom: 20px;
}

.shield-icon {
    font-size: 20px;
    margin-right: 8px;
}

/* Content */
.content {
    background: rgba(255, 255, 255, 0.9);
    padding: 30px;
    border-radius: 12px;
    text-align: center;
    max-width: 500px;
}

h1 {
    font-size: 48px;
    color: #333;
    margin-bottom: 10px;
}

p {
    font-size: 18px;
    color: #666;
    margin-bottom: 20px;
}

/* Password Button */
.password-btn {
    background-color: #4c82f7;
    color: #fff;
    padding: 12px 24px;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    cursor: pointer;
    transition: background 0.3s ease;
}

.password-btn:hover {
    background-color: #3a6cd4;
}

/* Popup */
.popup {
    background: #ffffff;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    margin-top: 20px;
    text-align: left;
}

.badge {
    background-color: #ff4500;
    color: #fff;
    padding: 4px 12px;
    font-size: 14px;
    border-radius: 20px;
    display: inline-block;
    margin-bottom: 8px;
}

h3 {
    color: #333;
    margin-bottom: 8px;
}

.unlimited-btn {
    background-color: #4c82f7;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    cursor: pointer;
    transition: background 0.3s ease;
}

.unlimited-btn:hover {
    background-color: #3a6cd4;
}

/* Dog Image */
.dog-image {
    margin-top: 20px;
    background: url('https://source.unsplash.com/200x200/?dog') no-repeat center;
    background-size: cover;
    width: 150px;
    height: 150px;
    border-radius: 50%;
}

/* Customize Button */
.customize-btn {
    background-color: #ccc;
    color: #333;
    padding: 8px 16px;
    border: none;
    border-radius: 6px;
    margin-top: 20px;
    cursor: pointer;
}

.customize-btn:hover {
    background-
   </style>`;
};

//Entry point of our extension and responsible for manipulating dom

// const searchedWebsite = windows.location.href;
// alert(searchedWebsite);
const searchedWebsite = window.location.hostname;
//alert(searchedWebsite)
let blockedSites;
chrome.storage.sync.get({blockedSites : []},(data)=>{
  //alert(data.blockedSites)
  if(data.blockedSites.includes(searchedWebsite)){
    alert("This website is blocked")
  }
})


const hostname = window.location.hostname;
//chrome.runtime.sendMessage({ hostname: hostname });
