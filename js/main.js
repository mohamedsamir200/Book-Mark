
let siteInput = document.getElementById("site-name");
let urlInput = document.getElementById("url-site");
let searchInput = document.getElementById("search");

let AddBtn = document.getElementById("add-btn");
let update = document.getElementById("update-btn");
let cancel = document.getElementById("cancel");

let showItem = document.getElementById("show-item");

let deleteBtn = document.querySelector("[title=Delete]");
let updateBtn = document.querySelector("[title=Update]");
let goToSiteBtn = document.querySelector("[title=toSite]");


let bookMarkArr = [];


/*==================== Get Item From LocalStorage ============================== */
if (localStorage.getItem("BookMark") !== null) {

    bookMarkArr = JSON.parse(localStorage.getItem("BookMark"));
    displayBookmark(bookMarkArr);

}

/*==================== Add Book Mark ============================== */

AddBtn.addEventListener("click", function () {

    if (siteInput.value != "" && urlInput.value != "") {
        AddBookmark();
        reset();
        displayBookmark(bookMarkArr);
        saveLocalStorage();
    }

    cancel.style.cssText = "display: none ";



});


/*================= Add Bookmark & Site =========================== */
function AddBookmark() {
    let data = {

        siteName: siteInput.value,
        urlName: urlInput.value,
    };

    bookMarkArr.push(data);

}

/*================= Reset Inputs =========================== */
function reset() {
    siteInput.value = "";
    urlInput.value = "";
}

/*================= Display Bookmark=========================== */

function displayBookmark(displaySite) {
    let box = '';
    for (let i = 0; i < displaySite.length; i++) {
        box += `
             <div class="item">
          <h5>${displaySite[i].siteName}</h5>
          <div class="icons">

            <i class="fa-solid fa-trash p-2 bg-danger text-white" title="Delete" onclick="deleteBookMark(${i})" ></i>
            <i class="fa-solid fa-pen-to-square p-2 bg-dark text-white" title="Update" onclick="getInfo(${i})"></i>
            <a href="https://${displaySite[i].urlName}" target="_blank">  <i class="fa-solid fa-up-right-from-square p-2 bg-info text-white"title="toSite"></i> </a>
          </div>
        </div> 
        `;
    }

    showItem.innerHTML = box;
}

/*================= Search BookMark =========================== */
searchInput.addEventListener("input", function () {

    searchBookMark();

});

function searchBookMark() {
    let newArr = [];
    bookMarkArr.forEach((ele) => {
        if (ele.siteName.toLowerCase().includes(searchInput.value.toLowerCase())) {

            newArr.push(ele);
        }
    });
    displayBookmark(newArr);
}

/*================= Delete BookMark =========================== */

function deleteBookMark(deleteIndex) {
    bookMarkArr.splice(deleteIndex, 1);
    saveLocalStorage();
    displayBookmark(bookMarkArr);

}

/*================= Update BookMark =========================== */
let currentIndex = 0;

function getInfo(updateIndex) {
    currentIndex = updateIndex;
    siteInput.value = bookMarkArr[updateIndex].siteName;
    urlInput.value = bookMarkArr[updateIndex].urlName;

    AddBtn.style.display = "none";
    update.style.display = "inline-block";
    cancel.style.cssText = "display: inline-block !important";


}

update.addEventListener("click", function () {

    updateBookmark();
    cancel.style.cssText = "display: none ";

});

cancel.addEventListener("click", function () {
    reset();
    update.style.display = "none";
    AddBtn.style.display = "inline-block";
    cancel.style.cssText = "display: none ";
});

function updateBookmark() {
    let data = {
        siteName: siteInput.value,
        urlName: urlInput.value,
    };

    bookMarkArr[currentIndex] = data;
    saveLocalStorage();
    displayBookmark(bookMarkArr);
    reset();
    AddBtn.style.display = "inline-block";
    update.style.display = "none";
    paragraph.classList.add("d-none");

}

/*================= Save Bookmark in Local storage=========================== */

function saveLocalStorage() {
    localStorage.setItem("BookMark", JSON.stringify(bookMarkArr));
}


/*=================  Event Keyboard  =========================== */

document.addEventListener("keydown", function (e) {

    if (e.key === "Enter") {


        if (siteInput.value !="" && urlInput.value !="") {

            if (AddBtn.style.display === "inline-block" && update.style.display === "none") {

                AddBookmark();
                saveLocalStorage();
                displayBookmark(bookMarkArr);
                cancel.style.cssText = "display: none ";
            } 
            
            else if (AddBtn.style.display === "none" && update.style.display === "inline-block") {

                updateBookmark();
                cancel.style.cssText = "display: none ";

                //  saveLocalStorage();
                // displayBookmark(bookMarkArr);
            }

            // displayBookmark(bookMarkArr);
            reset();
        }
    }

});







/*=================  Event Keyboard  =========================== */

/*=================  Validation  =========================== */

let paragraph = document.querySelector(".paragraph");


urlInput.addEventListener("input", function () {

    for (i = 0; i < bookMarkArr.length; i++) {

        if (bookMarkArr[i].urlName.toLowerCase() === urlInput.value.toLowerCase() || `${bookMarkArr[i].siteName.toLowerCase()}.` === urlInput.value.toLowerCase() || bookMarkArr[i].siteName.toLowerCase() === urlInput.value.toLowerCase()) {

            paragraph.classList.replace("d-none", "d-block");
            update.style.display = "inline-block";
            AddBtn.style.display = "none";

        } else {

            paragraph.classList.add("d-none");
            update.style.display = "none";
            AddBtn.style.display = "inline-block";

        }
    }
})


