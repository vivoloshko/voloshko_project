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
    // createElement + createTextNode
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