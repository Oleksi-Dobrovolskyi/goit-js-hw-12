import{a as L,S as b,i as d}from"./assets/vendor-DEenWwFD.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))f(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&f(c)}).observe(document,{childList:!0,subtree:!0});function n(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function f(t){if(t.ep)return;t.ep=!0;const o=n(t);fetch(t.href,o)}})();function v(r){return r.map(e=>`
      <a href="${e.largeImageURL}" class="gallery-item">
        <img src="${e.webformatURL}" alt="${e.tags}" loading="lazy" />
        <div class="gallery-info">
          <div>
            <p><b>Likes:</b> ${e.likes}</p>
            <p><b>Views:</b> ${e.views}</p>
          </div>
          <div>
            <p><b>Comments:</b> ${e.comments}</p>
            <p><b>Downloads:</b> ${e.downloads}</p>
          </div>
        </div>
      </a>
    `).join("")}const w="48313222-9e5699caa5ef89de4c12bc71b",S="https://pixabay.com/api/";async function P(r,e){return(await L.get(S,{params:{key:w,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:e}})).data}const q=document.querySelector("#search-form"),p=document.querySelector("#gallery"),g=document.querySelector("#loader"),m=document.querySelector("#pagination"),y=document.querySelector("#prev-page"),h=document.querySelector("#next-page"),$=document.querySelector("#page-info");let a=1,i="",s=0,l=!1,E=new b(".gallery a",{captionsData:"alt",captionDelay:250});q.addEventListener("submit",async r=>{if(r.preventDefault(),i=r.target.searchQuery.value.trim(),!i){d.error({title:"Error",message:"Please enter a search query!"});return}a=1,s=0,p.innerHTML="",m.classList.add("hidden"),await u(i,a)});async function u(r,e){if(!l){l=!0,B();try{const n=await P(r,e);if(n.hits.length===0&&e===1){d.warning({title:"No Results",message:"Sorry, there are no images matching your search query. Please try again!"});return}s=Math.ceil(n.totalHits/15),x(n.hits),e>1&&O(),R()}catch{d.error({title:"Error",message:"Failed to fetch images. Please try again later."})}finally{C(),l=!1}}}function x(r){const e=v(r);p.innerHTML+=e,E.refresh()}function O(){const r=document.querySelector(".gallery a").getBoundingClientRect().height;window.scrollBy({top:r*2,behavior:"smooth"})}function R(){m.classList.remove("hidden"),y.disabled=a===1,h.disabled=a===s,$.textContent=`Page ${a} of ${s}`}y.addEventListener("click",async()=>{a>1&&(a--,await u(i,a))});h.addEventListener("click",async()=>{a<s&&(a++,await u(i,a))});function B(){g.classList.remove("hidden")}function C(){g.classList.add("hidden")}
//# sourceMappingURL=index.js.map
