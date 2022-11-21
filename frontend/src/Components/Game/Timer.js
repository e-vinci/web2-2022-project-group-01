let time = 45;

function timerUpdate(){
    if(time===0){
        return;
    }
    time -=1;
    const divTimer= document.querySelector('#timer');
    divTimer.innerHTML=`<p> Time left : ${time} second  </p>`;
}

export default timerUpdate;