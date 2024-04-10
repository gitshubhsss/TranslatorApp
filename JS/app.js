const formText = document.querySelector(".from-text");
let toText = document.querySelector(".to-text");
const selectTag = document.querySelectorAll("select");
const exchangeIcon = document.querySelector(".exchange");
let translateBtn = document.querySelector("button");

selectTag.forEach(select);

function select(tag, id){
  for (const contry_code in countries) {
    let selected;
    if (id == 0 && contry_code == "en-GB") {
      selected = "selected";
    } else if (id == 1 && contry_code == "hi-IN") {
      selected = "selected";
    }
    let option = ` <option value="${contry_code}" ${selected}>${countries[contry_code]}</option>`;
    tag.insertAdjacentHTML("beforeend", option);
  }
}

exchangeIcon.addEventListener("click", () => {
  let tempText = formText.value,
    tempLang = selectTag[0].value;
  formText.value = toText.value;
  selectTag[0].value = selectTag[1].value;
  toText.value = tempText;
  selectTag[1].value = tempLang;
});

translateBtn.addEventListener("click", () => {
  let text = formText.value,
    translateFrom = selectTag[0].value,
    translateTo = selectTag[1].value;

  let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
  //fethching the api responce
  fetch(apiUrl)
  .then((res) => {
    res.json().then((data) => {
      toText.value = data.responseData.translatedText;
    })
  })
});

formText.addEventListener("keyup", () => {
  let text = formText.value,
    translateFrom = selectTag[0].value,
    translateTo = selectTag[1].value;

  let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
  //fethching the api responce
  fetch(apiUrl).then((res) => {
    res.json().then((data) => {
      toText.value = data.responseData.translatedText;
    });
  });
});
