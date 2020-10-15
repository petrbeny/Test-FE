
function showTagItems(tags) {
    var tagMenu = document.querySelector('#tags')
    tagMenu.innerHTML = "";
    tags.forEach(item => tagMenu.appendChild(createItem(item)));
}

function createItem(text) {
    var item = document.createElement('li');
    item.textContent = text;
    item.onclick = function () {
        removeTag(this.textContent);
    }

    return item;
}

function addTag() {
    var textbox = document.getElementById('textbox');
    if (!textbox.value) return;

    if (location.hash) {
        var tags = getTags(location.hash);

        if (!tags.includes(textbox.value)) {
            tags.push(textbox.value);
            location.hash = '#tags=' + tags.join(',');
        }
    }
    else {
        location.hash = '#tags=' + textbox.value;
    }

    textbox.value = '';
}

function removeTag(name) {
    var tags = getTags(location.hash);
    var index = tags.indexOf(name);

    if (index > -1) {
        tags.splice(index, 1);
    }

    location.hash = '#tags=' + tags.join(',');
}

function locationHashChanged() {
    console.log('location hash changed');
    showTagItems(getTags(location.hash));
}

function getTags(hash) {
    var tags = hash.split("=").length > 1 && hash.split("=")[1] ? hash.split("=")[1].split(",") : [];
    return tags;
}

function onPageLoad() {
    location.hash = '';
}
