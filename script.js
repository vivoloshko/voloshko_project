function userDialog() {
    let order = "";

    while (order === "" || order === null) {
        order = prompt("Який десерт ви шукаєте?");
        if (order === null) return; 
    }

    const lowerOrder = order.toLowerCase();
    const available = ["торт", "еклер", "макарон", "тарт", "чизкейк"];

    if (available.includes(lowerOrder)) {
        alert("У нас є десерт: " + order);
    } else {
        alert("Ми додамо " + order + " до асортименту!");
    }
}

function showDeveloper(lastName, firstName, position = "Студентка") {
    const devInfo = document.createElement("div");

    devInfo.style.cssText = `
        background: #3a0429;
        color: #debdd2;
        padding: 15px;
        text-align: center;
        margin-top: 20px;
    `;

    devInfo.innerHTML = `<strong>Розробник:</strong> ${lastName} ${firstName} 
                         | <strong>Посада:</strong> ${position}`;

    document.body.append(devInfo);
}

function compareStrings(str1, str2) {
    const result = str1.length >= str2.length ? str1 : str2;
    alert("Більший рядок: " + result);
}

function changeBgTemporary() {
    const oldBg = document.body.style.backgroundColor;

    document.body.style.backgroundColor = "#ffeaa7";

    setTimeout(() => {
        document.body.style.backgroundColor = oldBg;
        alert("Фон повернуто!");
    }, 30000);
}


function redirectToGallery() {
    if (confirm("Перейти до галереї?")) {
        window.location.href = "gallery.html";
    }
}


function updatePageContent() {
    const info = document.getElementById("text");

    if (info) {
        console.log("textContent:", info.textContent);

        if (info.firstChild) {
            console.log("nodeValue:", info.firstChild.nodeValue);
        }

        console.log("outerHTML:", info.outerHTML);

        info.innerHTML = "Сьогодні акція -15% на тарти!";
    }

    const items = document.querySelectorAll("li");
    items.forEach(item => console.log(item.textContent));
}


function manageElements() {
    
    const note = document.createElement("p");
    const textNode = document.createTextNode("Ми дбаємо про ваш настрій!");

    note.append(textNode);
    note.className = "js-note";

    document.body.prepend(note);

    const title = document.querySelector("h1");
    if (title) {
        const line = document.createElement("hr");
        title.after(line);
    }

    const oldElem = document.querySelector(".intro-text");
    if (oldElem) {
        const newElem = document.createElement("p");
        newElem.textContent = "Оновлено: Десерт дня - макарон";
        oldElem.replaceWith(newElem);
    }

    setTimeout(() => {
        const addedNote = document.querySelector(".js-note");
        if (addedNote) addedNote.remove();
    }, 5000);
}

window.onload = function () {
    showDeveloper("Волошко", "Вікторія");
};



function handleHeaderClick(event) {
    event.target.style.color = "pink"; 
    console.log("onclick (атрибут):", event.target.textContent);
}
// 1.2 Обробник через властивість
const img = document.querySelector("img");

if (img) {
    img.onclick = function () {
        this.style.border = "5px solid black";
        console.log("onclick (властивість)");
    };
}

const title = document.getElementById("main-title");

function handlerOne() {
    console.log("Перший етап обробки");
}

function handlerTwo() {
    console.log("Другий етап обробки");
}

if (title) {
    title.addEventListener("click", handlerOne);
    title.addEventListener("click", handlerTwo);
}

const objHandler = {
    handleEvent(event) {
        console.log("handleEvent:", event.currentTarget);
    }
};

const list = document.querySelector("ul");

if (list) {
    list.addEventListener("click", objHandler);
}

function moveHandler() {
    console.log("mousemove...");
}

document.addEventListener("mousemove", moveHandler);

setTimeout(() => {
    document.removeEventListener("mousemove", moveHandler);
    console.log("mousemove видалено");
}, 5000);



if (list) {
    list.onclick = function (event) {
        if (event.target.tagName !== "LI") return;

        Array.from(this.children).forEach(li => {
            li.style.color = "";
        });

        event.target.style.color = "orange";

        console.log("Обрано:", event.target.textContent);
    };
}


const menu = document.getElementById("action-menu");

if (menu) {
    menu.addEventListener("click", function (event) {
        const action = event.target.dataset.action;
        if (!action) return;

        const actions = {
            order() {
                alert("Замовлення оформлено");
            },
            discount() {
                alert("Знижка 10%");
            },
            reset() {
                location.reload();
            }
        };

        actions[action]?.();
    });
}


document.body.addEventListener("click", function () {
    console.log("Подія дійшла до body");
});


let ghost, offsetX, offsetY, currentDessert;

document.querySelectorAll('.dessert-item').forEach(dessert => {

    dessert.onmousedown = e => {

        currentDessert = dessert;

        const rect = dessert.getBoundingClientRect();

        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;

        ghost = dessert.cloneNode(true);

        ghost.style.cssText = `
            position: fixed !important;
            z-index: 9999 !important;
            pointer-events: none;
            opacity: 0.9;
            left: ${rect.left}px;
            top: ${rect.top}px;
            width: ${rect.width}px;
            background: #f2abdc; 
            border: none;        
            border-radius: 15px;
            padding: 15px 25px;
            box-shadow: 0 12px 35px rgba(69, 27, 47, 0.5);
            transform: scale(1.05);
        `;

        document.body.append(ghost);

        currentDessert.style.opacity = '0.4';
    };

    dessert.addEventListener('mouseover', event => {
        event.target.closest('.dessert-item').style.background = '#f8c0e7';
        event.target.closest('.dessert-item').style.transform = 'scale(1.1)';
        event.target.closest('.dessert-item').style.transition = '0.3s';
    });

    dessert.addEventListener('mouseout', event => {
        event.target.closest('.dessert-item').style.background = '#fff';
        event.target.closest('.dessert-item').style.transform = 'scale(1)';
    });
});

document.onmousemove = e => {
    if (ghost && currentDessert) {
        ghost.style.left = (e.clientX - offsetX) + 'px';
        ghost.style.top = (e.clientY - offsetY) + 'px';

        const wiggle = Math.sin(Date.now() * 0.006) * 7;
        ghost.style.transform = `rotate(${wiggle}deg) scale(1.05)`;
    }
};

document.onmouseup = e => {
    if (ghost && currentDessert) {
        const cart = document
            .elementFromPoint(e.clientX, e.clientY)
            ?.closest('.bakery-cart');

        if (cart) {
            cart.appendChild(currentDessert);
            currentDessert.style.transition = '0.3s';
            currentDessert.style.transform = 'scale(1.1)';

            setTimeout(() => {
                currentDessert.style.transform = 'scale(1)';
            }, 300);
        }

        currentDessert.style.opacity = '1';


        ghost.style.transition = '0.3s';
        ghost.style.opacity = '0';

        setTimeout(() => {
            if (ghost) ghost.remove();
            ghost = null;
            currentDessert = null;
        }, 300);
    }
};