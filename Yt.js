const key = 'AIzaSyAVrCfmWWbHSzKX9ULiOpy8Pb_hhiIdaMA'
const url = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&key=' + key + '&q='

const input = document.querySelector('input')
const button = document.querySelector('button')
const container = document.querySelector('.container')
const iframe = document.querySelector('iframe')
const closebutton=document.querySelector('.closebutton')
const homepageimage=document.querySelector('.header-image')
let request = new XMLHttpRequest();




function closeIframe(){

document.querySelector('iframe').classList.remove('showIframe')
closebutton.classList.add('hideclosebutton')
iframe.setAttribute('src', '')

}


function showVideo(videos) {
    let deletesuggestions=document.querySelectorAll('li')
    deletesuggestions.forEach(e=>e.remove())
    const cardsDelete = document.querySelectorAll('.card')
    input.textContent=''
    input.value = ''
    closebutton.classList.add('hideclosebutton')
    iframe.setAttribute('src', '')
    iframe.classList.remove('showIframe')
    cardsDelete.forEach(e => e.remove())
    videos.items.map((e) => {

        const video = document.createElement('div')
        video.className = "card"
        const title = document.createElement('h3')
        const desc = document.createElement('p')
        const img = document.createElement('img')


        video.addEventListener('click', () => {
closebutton.classList.remove('hideclosebutton')
            iframe.setAttribute('src', 'https://www.youtube.com/embed/' + e.id.videoId)
            iframe.classList.add('showIframe')
            window.scrollTo({ top: 0, behavior: 'smooth' })
        })

        title.textContent = e.snippet.title
        desc.textContent = e.snippet.description
        img.setAttribute('src', e.snippet.thumbnails.medium.url)


        
        video.appendChild(img)
        video.appendChild(title)
        video.appendChild(desc)

        container.appendChild(video)

    })
}


function fetchData() {
    request.open('GET', url + input.value)
    request.send()
    request.onload = () => {

        if (request.status >= 200 && request.status < 400) {
            showVideo(JSON.parse(request.responseText))
        }
        else {
            alert('Something went wrong!')
        }
    }

}

function homepageVideos(){

    request.open('GET', 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&key=' + key )
    request.send()
    request.onload = () => {

        if (request.status >= 200 && request.status < 400) {
            showVideo(JSON.parse(request.responseText))
        }
        else {
            alert('Something went wrong!')
        }
    }


}

function makeList(suggestions){
let deletesuggestions=document.querySelectorAll('li')
deletesuggestions.forEach(e=>e.remove())
let searchresult = document.createElement('li')

if(searchresult.textContent!==''&& searchresult.value!==''){
suggestions.items.map(e=>{
searchresult.textContent=e.snippet.title
document.querySelector('.searchresults').appendChild(searchresult)

searchresult.addEventListener('click',()=> {
    request.open('GET', 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&key=' + key + '&q=' + searchresult.textContent)
    request.send()
    request.onload = () => {

        if (request.status >= 200 && request.status < 400) {
            showVideo(JSON.parse(request.responseText))
        }
        else {
            alert('Something went wrong!')
        }
    }})




})

}

}


function showSearchSuggestions(){
    request.open('GET', 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&key=' + key + '&q=' + input.value)
    request.send()
    request.onload = () => {

        if (request.status >= 200 && request.status < 400) {
            makeList(JSON.parse(request.responseText))
        }
        else {
            alert('Something went wrong!')
        }
    }





}


button.addEventListener('click', fetchData)
closebutton.addEventListener('click', closeIframe)
window.addEventListener('load', homepageVideos)
homepageimage.addEventListener('click', homepageVideos)
input.addEventListener('keyup', showSearchSuggestions)