const r = new XMLHttpRequest();
r.open("GET", "https://huxley.apphb.com/all/hit/?accessToken=4cdddb45-52ab-429e-bd6f-e4e05633d93a", true);

r.onload = function () {
    if (r.status != 200) return;
    const resp = JSON.parse(r.response);
    const trains = resp.trainServices
    // console.log(resp);
    
    trains.forEach(train=> {
      if (parseInt(train.platform) === 1) {
      const para = document.createElement('p')
      let status = ''
      // if (train.etd) {
      //   status+=` ETD: ${train.etd}`
      // }
      if (train.sta) {
        status +=` Scheduled at: ${train.sta}`
      }
      if (train.eta){
        status +=` Arrives: ${train.eta}`
      }
      // if (train.std){
      //   status +=` Departs: ${train.std}`
      // }
      para.textContent = `${train.destination[0].locationName}, ${status}`
      document.querySelector('.result1').appendChild(para)
      // {console.log (`${train.destination[0].locationName}, Platform: ${train.platform}, ${train.sta} - ${train.eta}`)
      // }
    }
  }
  )
};
r.send();

const ro = new XMLHttpRequest();
ro.open("GET", "https://huxley.apphb.com/all/kgx/100?accessToken=4cdddb45-52ab-429e-bd6f-e4e05633d93a", true);

ro.onload = function () {
    if (ro.status != 200) return;
    const resp = JSON.parse(ro.response);
    const trains = resp.trainServices
    console.log(resp);
    
    trains.forEach((train,i)=> {
      if (["BDK", "PBO", "RYS", "CMB", "CBG"].includes(train.destination[0].crs)){
      const para = document.createElement('p')
      let status = ''
      
      if (train.sta) {
        status +=` Scheduled: ${train.sta},`
      }
      if (train.eta){
        status +=` Arrives: ${train.eta},`
      }
      if (train.etd) {
        status+=` Departs: ${train.etd},`
      }
      if (train.std){
        status +=` Scheduled Departure: ${train.std}`
      }
      let platform = ''
      if (train.platform) {
        platform += train.platform + ', '
      } else {
        platform += 'no platform'
      }
      para.textContent = `${train.destination[0].locationName}, ${platform} ${status}`
      document.querySelector('.result2').appendChild(para)
      // {console.log (`${train.destination[0].locationName}, Platform: ${train.platform}, ${train.sta} - ${train.eta}`)
      // }
    }
  }
  )
};
ro.send();

const rot = new XMLHttpRequest();
rot.open("GET", "https://huxley.apphb.com/all/stp/100?accessToken=4cdddb45-52ab-429e-bd6f-e4e05633d93a", true);

rot.onload = function () {
    if (rot.status != 200) return;
    const resp = JSON.parse(rot.response);
    const trains = resp.trainServices
    //console.log(resp);
    
    trains.forEach(train=> {
      if (train.platform === "B" && train.destination[0].crs ==="PBO") {
      const para = document.createElement('p')
      let status = ''
      if (train.etd) {
        status+=` etd: ${train.etd}`
      }
      if (train.sta) {
        status +=` sta: ${train.sta}`
      }
      if (train.eta){
        status +=` eta: ${train.eta}`
      }
      if (train.std){
        status +=` std: ${train.std}`
      }
      para.textContent = `${train.destination[0].locationName}, Platform: ${train.platform}, ${status}`
      document.querySelector('.result3').appendChild(para)
      // {console.log (`${train.destination[0].locationName}, Platform: ${train.platform}, ${train.sta} - ${train.eta}`)
      // }
    }
  }
  )
};
rot.send();
