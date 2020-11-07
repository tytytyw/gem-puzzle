let level = 16;


const field = document.createElement("div");
field.classList.add("field");
document.body.append(field);
const itemSize = 100;

const emptyPosition = {
    top: 0,
    left: 0
}

const ArrayItems = [];
ArrayItems.push(emptyPosition)

const MakeAMove = (index) => {

    const item = ArrayItems[index];

    if (Math.abs(emptyPosition.left - item.left) + Math.abs(emptyPosition.top - item.top) === 1) {

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


for (let i = 1; i<=level-1; i++) {
    const item = document.createElement("div");
    item.className = "field__item";
    field.appendChild(item);
    item.innerText = i;
    const left = i % 4;
    const top = (i - left) / 4;

    ArrayItems.push({
        left: left,
        top: top,
        el: item
    });


    item.style.left = `${left * itemSize}px`;
    item.style.top = `${top * itemSize}px`;

    item.addEventListener("click", () => {
        Move(i)
    })
    // item.addEventListener("click", Move(i))
  
}
