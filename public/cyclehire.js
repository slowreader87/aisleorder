/*
// push up to server:
// scp /home/charles/Desktop/cyclehire.js charles@etime.charlieafif.co.uk:/home/charles/aisleorder/public/

// pull down from server:
// scp charles@etime.charlieafif.co.uk:/home/charles/aisleorder/public/cyclehire.js /home/charles/Desktop/
*/

const xhr = new XMLHttpRequest();
//xhr.open("GET", 'https://api.tfl.gov.uk/bikepoint/', true);
xhr.open("GET", 'https://tfl.gov.uk/tfl/syndication/feeds/cycle-hire/livecyclehireupdates.xml', true);
xhr.onload = function(){

  const txt = xhr.responseText
 
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(txt,"text/xml");
  //console.log(xmlDoc.childNodes[0].childNodes[414].childNodes[1]);
  // same as:
  const test = xmlDoc.getElementsByTagName("station")[414].childNodes[1]
  //console.log(test);
  
  let lastUpdate = parseInt(xmlDoc.getElementsByTagName('stations')[0].attributes[0].nodeValue)
  //console.log(xmlDoc);
  
  //console.log(xmlDoc.getElementsByTagName("name")[414].innerHTML)



  // make an array from all the name elements
  //const names = Array.from(xmlDoc.getElementsByTagName("name"))
  // search names array for an entry with innerHTML that includes "lion"
  // const redLionIndexOld = names.findIndex(function(name){
  //   return name.innerHTML.includes('Breams')
  // })


  // useful code starts here.

  // create an array of all the stations
  const stations = Array.from(xmlDoc.getElementsByTagName("station"))

  const redLionIndex = stations.findIndex(function(station){
    return station.childNodes[1].innerHTML.includes('Lion Street')
  })

  const belgroveIndex = stations.findIndex(function(station){
    return station.childNodes[1].innerHTML.includes('Belgrove')
  })

  const birkenheadIndex = stations.findIndex(function(station){
    return station.childNodes[1].innerHTML.includes('Birkenhead')
  })

  const theobaldsIndex = stations.findIndex(function(station){
    return station.childNodes[1].innerHTML.includes('Theobald')
  })

  const breamsIndex = stations.findIndex(function(station){
    return station.childNodes[1].innerHTML.includes('Bream')
  })

  const chadsIndex = stations.findIndex(function(station){
    return station.childNodes[1].innerHTML.includes('Chad')
  })
  
  // Station Name
  // const stationName = stations[redLionIndex].childNodes[1].innerHTML
  // console.log(`Station Name: ${stationName}`);
  // // Bikes remaining
  // const bikesAvailable = stations[redLionIndex].childNodes[10].innerHTML
  // console.log(`Available Bikes: ${bikesAvailable}`);
  // // Spaces
  // const spaces = stations[redLionIndex].childNodes[11].innerHTML
  // console.log(`Spaces: ${spaces}`);
  // // Total Docks
  // const dockCapacity = stations[redLionIndex].childNodes[12].innerHTML
  // console.log(`Station Capacity: ${dockCapacity}`);
  // // Total Bikes Out of Action
  // const brokenBikes = dockCapacity - spaces - bikesAvailable
  // console.log(`Broken Bikes: ${brokenBikes}`)
  


  //console.log(names[414].innerHTML);
  
  let time = new Date(lastUpdate)
  //console.log(`last updated at: ${time.getHours()}:${time.getMinutes()}`);
  document.querySelector('#results').innerHTML = 
  `
  <h4>Last updated at: <span class="updatedAt">${time.getHours()}:${time.getMinutes()}</span></h4>

  <h2 class="workbound">${stations[redLionIndex].childNodes[1].innerHTML}</h2>
  <li>Bikes: ${stations[redLionIndex].childNodes[10].innerHTML}</li>
  <li>Spaces: ${stations[redLionIndex].childNodes[11].innerHTML}</li>
  

  <h3 class="workbound">${stations[theobaldsIndex].childNodes[1].innerHTML}</h3>
  <li>Bikes: ${stations[theobaldsIndex].childNodes[10].innerHTML}</li>
  <li>Spaces: ${stations[theobaldsIndex].childNodes[11].innerHTML}</li>

  <h3 class="workbound">${stations[breamsIndex].childNodes[1].innerHTML}</h3>
  <li>Bikes: ${stations[breamsIndex].childNodes[10].innerHTML}</li>
  <li>Spaces: ${stations[breamsIndex].childNodes[11].innerHTML}</li>

  <hr></hr>

  <h2 class="homebound">${stations[birkenheadIndex].childNodes[1].innerHTML}</h2>
  <li>Bikes: ${stations[birkenheadIndex].childNodes[10].innerHTML}</li>
  <li>Spaces: ${stations[birkenheadIndex].childNodes[11].innerHTML}</li>

  <h2 class="homebound">${stations[chadsIndex].childNodes[1].innerHTML}</h2>
  <li>Bikes: ${stations[chadsIndex].childNodes[10].innerHTML}</li>
  <li>Spaces: ${stations[chadsIndex].childNodes[11].innerHTML}</li>

  <h2 class="homebound">${stations[belgroveIndex].childNodes[1].innerHTML}</h2>
  <li>Bikes: ${stations[belgroveIndex].childNodes[10].innerHTML}</li>
  <li>Spaces: ${stations[belgroveIndex].childNodes[11].innerHTML}</li>
  `
  const workboundStyle = document.querySelectorAll('.workbound')

  workboundStyle.forEach(item => item.style.color = "rgb(29, 29, 195)")

  const homeboundStyle = document.querySelectorAll('.homebound')

  homeboundStyle.forEach(item => item.style.color = "rgb(51, 118, 51)")
  
  document.querySelector('.updatedAt').style.color = "rgb(215, 23, 23)"

  document.body.style.fontFamily = 'sans-serif'
  const infos = document.querySelectorAll('li')
  infos.forEach(item => item.style.fontSize = '1.2rem')
};
xhr.send();
