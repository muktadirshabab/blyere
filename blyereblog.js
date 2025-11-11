const LABELS=[{name:"Event",url:"https://blyere.blogspot.com/feeds/posts/default/-/Event?alt=json&max-results=10"},{name:"Exhibitions",url:"https://blyere.blogspot.com/feeds/posts/default/-/Exhibitions?alt=json&max-results=10"}];function fetchPosts(){const e=document.getElementById("blog-container"),t=[];let n=0;LABELS.forEach(l=>{const o=`jsonp_callback_${Date.now()}_${Math.random().toString(36).substr(2)}`,r=document.createElement("script");r.src=`${l.url}&callback=${o}`,window[o]=a=>{try{a&&a.feed&&a.feed.entry&&a.feed.entry.forEach(e=>{e.customLabel=l.name,t.push(e)})}catch(e){console.error("Error processing data:",e)}document.head.removeChild(r),delete window[o],n++,n===LABELS.length&&renderPosts(t)},r.onerror=()=>{console.error(`Failed to load posts for label: ${l.name}`),document.head.removeChild(r),delete window[o],n++,n===LABELS.length&&renderPosts(t)},document.head.appendChild(r)}),setTimeout(()=>{n<LABELS.length&&(console.log("Some requests timed out"),renderPosts(t))},1e4)}function renderPosts(e){const t=document.getElementById("blog-container");t.innerHTML="",0===e.length?t.innerHTML='<div class="error">No posts found. This might be due to CORS restrictions. Please check the browser console for details.</div>':(a=document.createElement("div"),a.className="grid-container",e.forEach(e=>{a.appendChild(createPostCard(e))}),t.appendChild(a));var a}function createPostCard(e){const t=document.createElement("div");t.className="post-card";const n=e.title.$t||"No Title",l=e.customLabel||"Uncategorized";let o="";e.media$thumbnail?o=e.media$thumbnail.url:o="https://via.placeholder.com/300x400/cccccc/666666?text=No+Image";const r=e.link.find(a=>a.rel==="alternate")||e.link[0],c=r?r.href:"#";return t.innerHTML=`<a href="${c}" target="_blank" class="post-link"><div class="post-label">${escapeHtml(l)}</div><img class="post-thumbnail" src="${o}" alt="${escapeHtml(n)}" onerror="this.src='https://via.placeholder.com/300x400/cccccc/666666?text=Image+Error'"><div class="post-title">${escapeHtml(n)}</div></a>`,t}function escapeHtml(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}document.addEventListener("DOMContentLoaded",fetchPosts);
document.getElementById("menuToggle").addEventListener("click",function(){const e=document.getElementById("navMenu");this.classList.toggle("open"),e.classList.toggle("open")});

  function displayPosts(json) {
    const posts = json.feed.entry || [];
    let html = '';
    posts.forEach(post => {
      const title = post.title.$t;
      const date = new Date(post.published.$t).toLocaleDateString();
      html += ` &#x2022; ${title} (${date}) &nbsp;&nbsp;&nbsp;`;
    });
    document.getElementById('news-content').innerHTML = html;
  }

  const script = document.createElement('script');
  script.src = "https://blyere.blogspot.com/feeds/posts/default?alt=json-in-script&max-results=10&callback=displayPosts";
  document.body.appendChild(script);


const SHEET_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwq0oMRhW4W_uLqOUZoFdzMgOqivU9TAWXy75O89Y9Tle1JYBfUxZgzANvo5Q6CJ1rN/exec";
function setSubscribed() { localStorage.setItem('newsletterSub', '1'); }
function isSubscribed() { return localStorage.getItem('newsletterSub') === '1'; }

window.addEventListener('DOMContentLoaded', function(){
  const overlay = document.getElementById('newsletter-popup-overlay');
  const form = document.getElementById('newsletter-popup');
  const emailInput = document.getElementById('newsletter-email');
  const msgDiv = document.getElementById('newsletter-msg');
  setTimeout(() => {
    if (!isSubscribed()) overlay.style.display = 'flex';
  }, 3000);

  function closePopup() {
    overlay.style.display = 'none';
    setSubscribed();
  }
  form.onsubmit = async function(e){
    e.preventDefault();
    const email = emailInput.value.trim();
    msgDiv.textContent = '';
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){
      msgDiv.textContent = "Enter a valid email address.";
      return;
    }
    try {
      await fetch(SHEET_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, date: (new Date()).toISOString() })
      });
      msgDiv.textContent = "Thanks for subscribing!";
      closePopup();
    } catch (err) {
      msgDiv.textContent = "Error. Please try again later.";
    }
  }
});

// blyere-analytics.js
(function() {
  const GA_ID = "G-ZSYCEYR6HE";

  function loadAnalytics() {
    // Load Google Analytics library
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    script.onload = initGA;
    document.head.appendChild(script);
  }

  function initGA() {
    // Initialize Analytics
    window.dataLayer = window.dataLayer || [];
    function gtag(){ dataLayer.push(arguments); }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', GA_ID, { 
      page_path: window.location.pathname,
      send_page_view: true 
    });

    // Optional: Track page changes on Blogger (if using AJAX navigation)
    window.addEventListener('popstate', () => {
      gtag('config', GA_ID, { page_path: window.location.pathname });
    });
  }

  // Start loading after page fully loads
  if (document.readyState === 'complete') loadAnalytics();
  else window.addEventListener('load', loadAnalytics);
})();
