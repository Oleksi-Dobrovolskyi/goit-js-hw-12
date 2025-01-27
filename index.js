import{S as u,i as a}from"./assets/vendor-5ObWk2rO.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&c(n)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function c(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const f="48313222-9e5699caa5ef89de4c12bc71b",p="https://pixabay.com/api/",m=document.querySelector("#search-form"),i=document.querySelector("#gallery"),l=document.querySelector("#loader");let d=new u(".gallery a",{captionsData:"alt",captionDelay:250});m.addEventListener("submit",s=>{s.preventDefault();const o=s.target.searchQuery.value.trim();if(!o){a.error({title:"Error",message:"Please enter a search query!"});return}y(o)});async function y(s){g();try{const r=await(await fetch(`${p}?key=${f}&q=${encodeURIComponent(s)}&image_type=photo&orientation=horizontal&safesearch=true`)).json();if(r.hits.length===0){a.warning({title:"No Results",message:"Sorry, there are no images matching your search query. Please try again!"}),i.innerHTML="";return}h(r.hits),d.refresh()}catch{a.error({title:"Error",message:"Failed to fetch images. Please try again later."})}finally{b()}}function h(s){i.innerHTML="";const o=s.map(r=>`
      <a href="${r.largeImageURL}" class="gallery-item">
        <img src="${r.webformatURL}" alt="${r.tags}" loading="lazy" />
        <div class="gallery-info">
          <div>
            <p><b>Likes:</b> ${r.likes}</p>
            <p><b>Views:</b> ${r.views}</p>
          </div>
          <div>
            <p><b>Comments:</b> ${r.comments}</p>
            <p><b>Downloads:</b> ${r.downloads}</p>
          </div>
        </div>
      </a>
    `).join("");i.innerHTML=o,d.refresh()}function g(){l.classList.remove("hidden")}function b(){l.classList.add("hidden")}
//# sourceMappingURL=index.js.map
