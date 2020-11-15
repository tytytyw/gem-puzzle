// options
let level = 16;
let levelSqrt = Math.sqrt(level);
// calc item size
let itemSize = document.documentElement.clientWidth > document.documentElement.clientHeight
    ? document.documentElement.clientHeight / (levelSqrt + 1)
    : document.documentElement.clientWidth  / (levelSqrt + 1);
let count = 0;
//create header
createHeader = () => {
    const header = document.createElement("header");
    const timer = document.createElement("div");
    const counter = document.createElement("div");
    const btn = document.createElement("btn");
    timer.className = "timer";
    counter.className = "counter";
    btn.className = "btn";
    btn.textContent = "Pause"
    document.body.append(header);
    header.append(timer);
    header.append(counter);
    header.append(btn);
    counter.innerHTML = `Moves: ${count}`
    header.style.width = levelSqrt * itemSize + 'px';

    let time = 0;
    const upgradeTimer = () => {
        time++
        timer.innerHTML = `${Math.floor(time/60)} : ${time%60}`
    }
    let upgradeTimerInterval = setInterval(upgradeTimer, 1000)
    
    btn.onclick = (e) => {
        e.target.parentElement.classList.toggle("bloked");
        e.currentTarget.classList.toggle("active");
        e.target.className.includes("active")
        ? clearInterval(upgradeTimerInterval)
        : upgradeTimerInterval = setInterval(upgradeTimer, 1000)
    }
}

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
    for (let i = 0; i<level-1; i++) {
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
            id: ""+left+top
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
                alert('done')
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