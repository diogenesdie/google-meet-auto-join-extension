const setCSS = () => {
    const css = `.set-timeout{
                    display: flex;
                    justify-content: center;
                    width: 2.3vw;
                    cursor: pointer;

                }

                drop-options{
                    width: 50vw;
                }

                .list-active{
                    position: absolute;
                    display: block !important;
                    margin-left: -4%;
                    margin-top: 1%;
                }

                .list{
                    display: none;
                }

                .calendar{
                    display: flex;
                    justify-content: center;
                    width: 10vw;
                }

                .btn{
                    cursor: pointer;
                    display: flex;
                    justify-content: center;
                    margin-left: 21%;
                    margin-top: 2%;
                    height: 1.5vw;
                    width: 6.4vw;
                    border: none;
                    border-radius: 10vw;
                    background-color: #00796B;
                    color: #FFFFFF;
                    font-size: 1vw;
                    font-family: 'Google Sans',Roboto,Arial,sans-serif;
                    font-weight: 500;
                }

    `

    const style = document.createElement('style');
    
    style.appendChild(document.createTextNode(css));

    document.getElementsByTagName('head')[0].appendChild(style);
}

const getTimeout = ()=>{
    const date  = document.querySelector(".calendar");
    
    if(!date.value){
        alert("You must insert a date!");
        return;
    }

    const input_date = new Date(date.value).getTime();
    const present_date = new Date().getTime();

    const time_to_timeout = input_date - present_date;
    
    setTimeOut(time_to_timeout);
};

const setTimeOut = (time_to_timeout)=>{

    const button = document.querySelector(".l4V7wb");
    
    let seconds = Math.floor((time_to_timeout/1000)%60);
    let minutes = Math.floor((time_to_timeout/(1000*60))%60);
    let hours = Math.floor((time_to_timeout/(1000*60*60))%24);

    if(hours<10) hours = "0"+hours;
    if(minutes<10) minutes = "0"+minutes;
    if(seconds<10) seconds = "0"+seconds;

    alert("Auto Join defined for " + hours + ":" + minutes + ":" + seconds + "(h:m:s)\nDon't close the chrome tab!");

    if(definedTimeout) 
        clearTimeout(definedTimeout);

    definedTimeout = setTimeout(()=>{
        button.click();
    }, time_to_timeout);
    
};

const createButton = () => {
    const header = document.querySelector('.jmSZUc');
    const button = document.createElement('img');
    const options = document.createElement('div');
    const list = document.createElement('div');
    const calendar = document.createElement('input');
    const setTime = document.createElement('button');
    const cancelTimeout = document.createElement('button');

    setTime.appendChild(document.createTextNode("Set Join"));
    setTime.setAttribute("class", "btn");

    cancelTimeout.appendChild(document.createTextNode("Cancel Join"));
    cancelTimeout.setAttribute("class", "btn");

    button.setAttribute("src", "https://gemolstpc.ga/calendar.svg");
    button.setAttribute("class", "set-timeout");

    calendar.setAttribute("type", "datetime-local");
    calendar.setAttribute("class", "calendar");

    list.setAttribute("class", "list");
    list.appendChild(calendar);
    list.appendChild(setTime);
    list.appendChild(cancelTimeout);

    options.setAttribute("class", "drop-options");
    options.appendChild(button);
    options.appendChild(list);
    
    header.after(options);
    
    button.addEventListener('click', ()=>{
        list.classList.toggle("list-active");
    });

    setTime.addEventListener('click', getTimeout);

    cancelTimeout.addEventListener('click', ()=>{
        if(!definedTimeout){
            alert("There is no time set!");
            return;
        }
            
        clearTimeout(definedTimeout);
        alert("Join canceled!");
    });
}

const start = () => {
    setCSS();
    createButton();
}

let definedTimeout = null;
window.onload = start;



