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


function openNewsletter() {
  document.getElementById("newsletter-popup").style.display = "flex";
}
function closeNewsletter() {
  document.getElementById("newsletter-popup").style.display = "none";
}

document.addEventListener("DOMContentLoaded", function() {
  setTimeout(openNewsletter, 1200); // Show pop-up after 1.2s

  document.getElementById('newsletterForm').onsubmit = function(e) {
    e.preventDefault();
    var name = document.getElementById('name').value.trim();
    var email = document.getElementById('email').value.trim();
    var msgBox = document.getElementById('resultMsg');
    // Basic validation
    if (!name || !email) {
      msgBox.textContent = "Both fields are required!";
      return;
    }
    // Google Apps Script endpoint for form submission
    var scriptURL = 'https://script.google.com/macros/s/AKfycbxdSh50o5oghv4u-5-snLMsr6bxFFigd65pzAKSVO-Q-_jdrUWm5Pw6uqrUZX8l7SIU/exec';
    fetch(scriptURL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`
    }).then(() => {
      msgBox.style.color = "#128c1f";
      msgBox.textContent = "Thank you for subscribing!";
      document.getElementById('newsletterForm').reset();
      setTimeout(closeNewsletter, 1400);
    }).catch(() => {
      msgBox.textContent = "Failed to subscribe. Please try again.";
    });
  };
});
