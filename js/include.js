function loadHTML(selector, file){
    fetch(file)
    .then(response =>{
        if(!response.ok) throw new Error('无法加载 ${file}');
        return response.text();
    })
    .then(data => {
        document.querySelector(selector).innerHTML = data;
    })
    .catch(err => console.error(err));
}
 document.addEventListener("DOMContentLoaded",() => {
        loadHTML("header","components/header.html");
    }); 