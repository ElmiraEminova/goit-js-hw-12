import{a as m,S as w,i}from"./assets/vendor-f144e563.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))d(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&d(o)}).observe(document,{childList:!0,subtree:!0});function l(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function d(e){if(e.ep)return;e.ep=!0;const r=l(e);fetch(e.href,r)}})();const g=s=>s.reduce((t,{tags:l,webformatURL:d,largeImageURL:e,likes:r,views:o,comments:v,downloads:b})=>t+`<li class="photo-container">
    <a href=${e} class="card-link js-card-link">
        <img class="photo" src="${d}" alt="${l}" >
    </a>
    <div class="info">
        <div class="info-item">
            <h3 class="title">Likes</h3>
            <p class="info">${r}</p>
        </div>
        <div class="info-item">
            <h3 class="title">Views</h3>
            <p class="info">${o}</p>
        </div>
        <div class="info-item">
            <h3 class="title">Comments</h3>
            <p class="info">${v}</p>
        </div>
        <div class="info-item">
            <h3 class="title">Downloads</h3>
            <p class="info">${b}</p>
        </div>
    </div>
</li>
    `,""),P="44000737-c23aa9eb5fa4f7b392d266f4c",S="https://pixabay.com/api/",p=15;m.defaults.baseURL=S;const y=async(s,t=1)=>(await m.get("",{params:{key:P,q:s,image_type:"photo",orientation:"horizontal",safesearch:"true",page:t,per_page:p}})).data,n=document.querySelector(".gallery"),E=document.querySelector(".search-form"),c=document.querySelector(".loader"),f=document.querySelector(".js-load-more");let a=1,h="",u=0;const L=new w(".gallery a",{captionsData:"alt",captionsDelay:250}),M=async s=>{if(s.preventDefault(),h=s.target.elements.searchKeyword.value.trim(),h===""){n.innerHTML="",s.target.reset(),i.error({message:"Sorry, there are no images matching your search query. Please try again!"});return}n.innerHTML="",f.classList.add("d-none"),c.classList.remove("is-hidden");try{a=1;const t=await y(h,a);if(t.hits.length===0){i.error({message:"Sorry, there are no images matching your search query. Please try again!"}),c.classList.add("is-hidden");return}n.innerHTML=g(t.hits),u=Math.ceil(t.totalHits/p),a<u?f.classList.remove("d-none"):i.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),L.refresh()}catch(t){console.error(t),i.error({message:"An error occurred while fetching the images. Please try again later!"})}finally{c.classList.add("is-hidden")}},q=async()=>{a+=1,c.classList.remove("is-hidden");try{const s=await y(h,a);n.insertAdjacentHTML("beforeend",g(s.hits)),L.refresh();const{height:t}=n.firstElementChild.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"}),a>=u&&f.classList.add("d-none")}catch(s){console.error(s),i.error({message:"An error occurred while fetching the images. Please try again later!"})}finally{c.classList.add("is-hidden")}};E.addEventListener("submit",M);f.addEventListener("click",q);
//# sourceMappingURL=commonHelpers.js.map
