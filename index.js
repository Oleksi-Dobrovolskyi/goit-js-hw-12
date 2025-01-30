import{a as g,S as L,i}from"./assets/vendor-DEenWwFD.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))m(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const d of o.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&m(d)}).observe(document,{childList:!0,subtree:!0});function a(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function m(t){if(t.ep)return;t.ep=!0;const o=a(t);fetch(t.href,o)}})();function b(r){return r.map(e=>`
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
    `).join("")}const v="48313222-9e5699caa5ef89de4c12bc71b",w="https://pixabay.com/api/";async function S(r,e){return(await g.get(w,{params:{key:v,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:e}})).data}const q=document.querySelector("#search-form"),y=document.querySelector("#gallery"),f=document.querySelector("#loader"),n=document.querySelector("#load-more");let s=1,l="",c=0,h=0,u=!1,P=new L(".gallery a",{captionsData:"alt",captionDelay:250});n.classList.add("hidden");q.addEventListener("submit",async r=>{if(r.preventDefault(),l=r.target.searchQuery.value.trim(),!l){i.error({title:"Error",message:"Please enter a search query!"});return}s=1,c=0,h=0,y.innerHTML="",n.classList.add("hidden"),await p(l,s)});async function p(r,e){if(!u){u=!0,$();try{const a=await S(r,e,15);if(a.hits.length===0&&e===1){i.warning({title:"No Results",message:"Sorry, there are no images matching your search query. Please try again!"});return}h=a.totalHits,c=Math.ceil(h/15),E(a.hits),s>=c?(n.classList.add("hidden"),i.info({title:"End of Results",message:"We're sorry, but you've reached the end of search results."})):n.classList.remove("hidden")}catch{i.error({title:"Error",message:"Failed to fetch images. Please try again later."})}finally{A(),u=!1}}}function E(r){const e=b(r);y.insertAdjacentHTML("beforeend",e),P.refresh()}function R(){const r=document.querySelector(".gallery a").getBoundingClientRect().height;window.scrollBy({top:r*2,behavior:"smooth"})}n.addEventListener("click",async()=>{s<c&&(s++,await p(l,s),R())});function $(){f.classList.remove("hidden"),n.insertAdjacentElement("afterend",f)}function A(){f.classList.add("hidden")}
//# sourceMappingURL=index.js.map
