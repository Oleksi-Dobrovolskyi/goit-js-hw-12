import{S as y,i as d,a as g}from"./assets/vendor-DEenWwFD.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function t(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=t(e);fetch(e.href,r)}})();const h="48313222-9e5699caa5ef89de4c12bc71b",b="https://pixabay.com/api/",L=document.querySelector("#search-form"),u=document.querySelector("#gallery"),m=document.querySelector("#loader"),f=document.querySelector("#pagination");let n=1,i="",c=0,v=new y(".gallery a",{captionsData:"alt",captionDelay:250});L.addEventListener("submit",o=>{if(o.preventDefault(),i=o.target.searchQuery.value.trim(),!i){d.error({title:"Error",message:"Please enter a search query!"});return}n=1,p(i,n)});async function p(o,a){q();try{const s=(await g.get(b,{params:{key:h,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:a}})).data;if(s.hits.length===0){d.warning({title:"No Results",message:"Sorry, there are no images matching your search query. Please try again!"}),u.innerHTML="",f.innerHTML="";return}c=Math.ceil(s.totalHits/10),P(s.hits),$()}catch{d.error({title:"Error",message:"Failed to fetch images. Please try again later."})}finally{S()}}function P(o){u.innerHTML="";const a=o.map(t=>`
      <a href="${t.largeImageURL}" class="gallery-item">
        <img src="${t.webformatURL}" alt="${t.tags}" loading="lazy" />
        <div class="gallery-info">
          <div>
            <p><b>Likes:</b> ${t.likes}</p>
            <p><b>Views:</b> ${t.views}</p>
          </div>
          <div>
            <p><b>Comments:</b> ${t.comments}</p>
            <p><b>Downloads:</b> ${t.downloads}</p>
          </div>
        </div>
      </a>
    `).join("");u.innerHTML=a,v.refresh()}function $(){f.innerHTML="";const o=`
    <button class="btn-prev" ${n===1?"disabled":""}>Previous</button>
  `,a=`
    <button class="btn-next" ${n===c?"disabled":""}>Next</button>
  `;f.innerHTML=`${o} <span>Page ${n} of ${c}</span> ${a}`;const t=document.querySelector(".btn-prev"),s=document.querySelector(".btn-next");t&&t.addEventListener("click",()=>{n>1&&(n--,p(i,n))}),s&&s.addEventListener("click",()=>{n<c&&(n++,p(i,n))})}function q(){m.classList.remove("hidden")}function S(){m.classList.add("hidden")}
//# sourceMappingURL=index.js.map
