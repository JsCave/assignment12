let searchTap=document.getElementById("searchTap")
let htmlData=document.getElementById("htmlData")
let previous=""
let temp=""


searchTap.addEventListener('input',()=>{
  getData(searchTap.value)
})


async function getData(pram) {
if(!pram){pram="cairo"; previous=pram}


  const url=`https://api.weatherapi.com/v1/forecast.json?key=f297823f21354f43b40225843250407&q=${pram}&days=3&aqi=no&alerts=no`
  let Data=await fetch(url)
  let res=await Data.json()
  if(res.error){getData(previous)}else{
//console.log(res)
    previous=res.location.name
 //console.log(res.location.name)
//console.log(res.forecast)
let i=0
const now = new Date();
const currentHour = now.getHours();
res.forecast.forecastday.forEach(day => {
  i++
  //console.log("i"+i)
  //console.log(`Date: ${day.date}`)
  //console.log(`Conditions: ${day.day.condition.text}`)
  //console.log(`Max Temp: ${day.day.maxtemp_c}°C`)
  //console.log(`Min Temp: ${day.day.mintemp_c}°C`)
  //console.log(`HOUR: ${day.hour[currentHour].temp_c}`)
  // access other properties as needed
  ///////////
  function formatDay(dateString) {
    let date = new Date(dateString);
    let options = { day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }
  function formatDayName(dateString) {
    let date = new Date(dateString);
    let options = { weekday: 'long' };
    return date.toLocaleDateString('en-US', options);
  }
  function formatMonth(dateString) {
    let date = new Date(dateString);
    let options = { month: 'long' };
    return date.toLocaleDateString('en-US', options);
  }

  let date = day.date;
  
if(i==1){
  temp+=`
  <div class="col-md-12 col-lg-4 rounded-start-3" style="background-color: #323544">

      <div class="d-flex w-100 text-secondary justify-content-around rounded-start-3" style="background-color:#2c2f3d;"><p>${formatDayName(date)}</p><p>${formatDay(date)} ${formatMonth(date)}</p></div>
      <div class="container">
      <p class="h4 text-secondary m-2">${res.location.name}</p>
      <h1 class="text-white fa-6x fa-bold">${res.current.temp_c}°C</h1>
      <img src="${res.current.condition.icon}">
      <p class="text-info m-2">${res.current.condition.text}</p>
      <div class="text-secondary m-2"><span><img src="img/icon-umberella.png"> 20%</span><span><img src="img/icon-wind.png"> ${res.current.wind_kph}KM/H</span><span><img src="img/icon-compass.png"> ${res.current.wind_dir}</span></div>
   
    </div>
  </div>
  `
}
if(i==2){
  temp+=`
    <div class="col-md-12 col-lg-4" style="background-color: #262936">
            <div class="d-flex w-100 text-secondary justify-content-center" style="background-color:#222430;"><p>${formatDayName(date)}</p></div>
      <div class="container d-flex flex-column align-items-center justify-content-between align-content-between pt-5 px-2 pb-1">
        <img src="${day.day.condition.icon}" width="50px" class="mb-4">
        <h1 class="text-white">${day.day.maxtemp_c}°C</h1>
        <h6 class="text-secondary">${day.day.mintemp_c}°C</h6>
      <p class="text-primary m-2 py-2">${day.day.condition.text}</p>   
    </div>
    </div>
  `
}
if(i==3){
  temp+=`
    <div class="col-md-12 col-lg-4" style="background-color: #323544">
      <div class="d-flex w-100 text-secondary justify-content-center" style="background-color:#2c2f3d;"><p>${formatDayName(date)}</p></div>
<div class="container d-flex flex-column align-items-center justify-content-between align-content-between pt-5 px-2 pb-1">
  <img src="${day.day.condition.icon}" width="50px" class="mb-4">
  <h1 class="text-white">${day.day.maxtemp_c}°C</h1>
  <h6 class="text-secondary">${day.day.mintemp_c}°C</h6>
<p class="text-primary m-2 py-2">${day.day.condition.text}</p>   
</div>
</div>
  `
}





  ////////////////////
})
htmlData.innerHTML=temp
temp=""
  }
}

async function getLocation() {
    const url='https://api.ipgeolocation.io/v2/ipgeo?apiKey=8192389f37f54490b8cab7db18754fa1'
    let Data=fetch(url).then(async (data)=>{
      let res=await data.json()
      
      if(res.location.city){
        getData(res.location.city)
      }else{
        getData(0)
      }
    }
    ).catch((e)=>{
      
      console.log(e)
      getData(0)
    })


}

getLocation()


