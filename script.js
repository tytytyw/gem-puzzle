// options
let level;
level = localStorage.getItem("gem-puzzle--level")**2 || 16;
let levelSqrt = Math.sqrt(level);
// calc item size
let itemSize = document.documentElement.clientWidth > document.documentElement.clientHeight
    ? document.documentElement.clientHeight / (levelSqrt + 1)
    : document.documentElement.clientWidth  / (levelSqrt + 1);
let count = 0;
let time = 0;
//create header
createHeader = () => {
    //create tags
    const header = document.createElement("header");
    const wrap = document.createElement("div");
    const timer = document.createElement("div");
    const counter = document.createElement("div");
    const btn = document.createElement("div");
    const elRestart = document.createElement("div");
    const elLevels = document.createElement("div");
    const elLevelsWrap = document.createElement("div");
    //tags props
    elLevels.className = "levels";
    elLevelsWrap.className = "levels_wrap";
    elRestart.className = "restart";
    elRestart.textContent = "Restart";
    elLevels.textContent = "Level";
    timer.className = "timer";
    wrap.className = "wrap";
    counter.className = "counter";
    btn.className = "btn";
    btn.textContent = "Pause"
    document.body.append(header);
    //tag insert
    header.append(wrap);
    wrap.append(timer);
    wrap.append(counter);
    wrap.append(btn);
    wrap.append(elRestart);
    wrap.append(elLevels);
    elLevels.append(elLevelsWrap);
    //header props
    counter.innerHTML = `Moves: ${count}`
    header.style.width = levelSqrt * itemSize * 1.1 + 'px';
    timer.innerHTML = "00:00"
    //create levels list
    for (let i = 0; i < 6; i++) {
        let item = document.createElement("a");
        item.className = "levels_list"
        item.textContent = `${i+3}x${i+3}`;
        item.setAttribute('data-value', i+3);
        elLevelsWrap.appendChild(item)
    }

    const upgradeTimer = () => {
        time++;
        let min = Math.floor(time/60);
        let sec = time%60;
        timer.innerHTML = `${min<10 ? '0'+min : min}:${sec<10 ? '0'+sec : sec}`
    }
    let upgradeTimerInterval = setInterval(upgradeTimer, 1000)
    //click pause
    btn.onclick = (e) => {
        e.target.parentElement.parentElement.classList.toggle("bloked");
        e.currentTarget.classList.toggle("active");
        if (e.target.className.includes("active")) {
            clearInterval(upgradeTimerInterval);
            e.target.textContent = "Resume"
        } else {
            upgradeTimerInterval = setInterval(upgradeTimer, 1000);
            e.target.textContent = "Pause"
        }
    }
    //click levels
    elLevels.onclick = (e) => {
        e.target.className === "levels_list"
        ? (() => {localStorage.setItem('gem-puzzle--level', e.target.getAttribute('data-value')); this.location.reload()})()
        : e.currentTarget.classList.toggle("active");
    }
    // click restart
    function restartGame () {
        window.location.reload()
    }
    elRestart.addEventListener("click", restartGame)
}

// moves counter
const writeCouter = count => {
    document.querySelector(".counter").innerHTML = ` Moves: ${count}`
}

//create game field
function createGameField (level) {
    
    const field = document.createElement("div");
    //save empty coordinates
    const emptyPosition = {
        top: levelSqrt - 1,
        left: levelSqrt - 1
    };
    emptyPosition.id = "" + emptyPosition.left + emptyPosition.top;
    const ArrayItems = [];
    ArrayItems.push(emptyPosition);
    field.classList.add("field");
    document.body.append(field);
    //item size
    field.style.fontSize = itemSize + "px";
    field.style.width = levelSqrt * itemSize + 'px';
    field.style.height = levelSqrt * itemSize + 'px';
    field.style.fontSize = itemSize + "px";
    //create field items
    for (let i = 0; i < level - 1; i++) {
        const item = document.createElement("div");
        item.className = "field__item";
        field.append(item);
        item.style.width = itemSize + 'px';
        item.style.height = itemSize + 'px';
        item.innerText = i+1;
        //calc top and left coordinates(index)
        const left = i % levelSqrt;
        const top = (i - left) / levelSqrt;
        //save item coordinates in obj
        ArrayItems.push({
            left: left,
            top: top,
            el: item,
            id: "" + left + top
        });
        // item width and height
        item.style.left = `${left * itemSize}px`;
        item.style.top = `${top * itemSize}px`;
        // click on item event listener
        item.addEventListener("click", (e) => {
            e.preventDefault();
            MakeAMove(i+1, ArrayItems, emptyPosition, 'clicked')
            // after compelete
            function finish () {
                let min = Math.floor(time / 60);
                let sec = time % 60;
                let result = `${min<10 ? '0'+min : min}:${sec<10 ? '0'+sec : sec}`
                alert(`Victory! time- ${result}, moves- ${count}`)
                window.location.reload()
            }
            //check complete level and call func
            if (ArrayItems.every(item => "" + item.left + item.top === item.id)) {
                setTimeout(finish, 300);
            }
        })
    }

    //temp random
    for (let i=0; i<20000*level; i++) {
         MakeAMove(Math.floor(Math.random() * (level)), ArrayItems, emptyPosition)
    }
}

// function click on item
const MakeAMove = (index, ArrayItems, emptyPosition, typeCall) => {
    const item = ArrayItems[index];
    // check valid click
    if (Math.abs(emptyPosition.left - item.left) + Math.abs(emptyPosition.top - item.top) === 1) {
        //coordinates mapping (emty and clicked item)
        item.el.style.left = `${emptyPosition.left * itemSize}px`;
        item.el.style.top = `${emptyPosition.top * itemSize}px`;
        const tempLeft = emptyPosition.left;
        const tempTop = emptyPosition.top;
        emptyPosition.left = item.left;
        emptyPosition.top = item.top;
        item.left = tempLeft;
        item.top = tempTop;
        typeCall ? writeCouter(++count) : "";
    }
}

//call
createHeader()
createGameField(level);