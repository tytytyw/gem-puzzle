// options
let level = 16;
// calc item size
let itemSize = document.documentElement.clientWidth > document.documentElement.clientHeight
    ? document.documentElement.clientHeight / (Math.sqrt(level)+1)
    : document.documentElement.clientWidth / (Math.sqrt(level)+1);

//create game field
function createGameField (level) {
    let levelSqrt = Math.sqrt(level);
    const field = document.createElement("div");
    //save empty coordinates
    const emptyPosition = {
        top: levelSqrt - 1,
        left: levelSqrt - 1
    };
    const ArrayItems = [];
    ArrayItems.push(emptyPosition);
    field.classList.add("field");
    document.body.append(field);
    //item size
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
            el: item
        });
        // item width and height
        item.style.left = `${left * itemSize}px`;
        item.style.top = `${top * itemSize}px`;
        // click on item event listener
        item.addEventListener("click", (e) => {
            console.log(e.preventDefault())
            e.preventDefault();
            MakeAMove(i+1, ArrayItems, emptyPosition)
        })
    }

    // temp random
    for (let i=0; i<20000*level; i++) {
         MakeAMove(Math.floor(Math.random() * (level)), ArrayItems, emptyPosition)
    }

}

// function click on item
const MakeAMove = (index, ArrayItems, emptyPosition) => {
    const item = ArrayItems[index];
    // check valid click
    if (Math.abs(emptyPosition.left - item.left) + Math.abs(emptyPosition.top - item.top) === 1) {
        // console.log('index')
        //coordinates mapping (emty and clicked item)
        item.el.style.left = `${emptyPosition.left * itemSize}px`;
        item.el.style.top = `${emptyPosition.top * itemSize}px`;
        const tempLeft = emptyPosition.left;
        const tempTop = emptyPosition.top;
        emptyPosition.left = item.left;
        emptyPosition.top = item.top;
        item.left = tempLeft;
        item.top = tempTop;
    }

    
}



//call
createGameField(level);