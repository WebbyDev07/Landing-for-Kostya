document.querySelector("form").addEventListener("submit", handleForm);

async function postData(url = "", data = {}) {
  // Default options are marked with *
  return await fetch(url, {
    method: "POST",
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
}

function handleForm(e) {
  e.preventDefault();
  let values = {};
  let fields = e.target.querySelectorAll("input, textarea");
  for (let i = 0; i < fields.length; i++) {
    values[fields[i].name] = fields[i].value;
  }
  const body = `Username: ${values["name"]}<br>Email: ${values["email"]}<br>Message: ${values["field"]}`;

  document.getElementById("submit-form-btn").setAttribute("disabled", true);
  document.getElementById("submit-form-btn-text").innerHTML = "Please wait...";

  postData(
    "https://script.google.com/macros/s/AKfycbykBvsL__XzToiZGGK0-sdv-Omrw6I8lvRDlmHazQkn0i4yTrzLpEt-PckzYUDhSZ-K/exec",
    { body: body }
  )
    .then((response) => {
      document.querySelector(".w-form-done").style = "display: block";
      document.querySelector("#email-form").style = "display: none";

      document.getElementById("submit-form-btn").removeAttribute("disabled");
      document.getElementById("submit-form-btn-text").innerHTML =
        "Send message";
    })
    .catch((error) => {
      document.querySelector(".w-form-fail-2").style = "display: block";
      document.getElementById("submit-form-btn").removeAttribute("disabled");
      document.getElementById("submit-form-btn-text").innerHTML =
        "Send message";
    });
}

let PROJECT_ID = "7ggih58a";
let DATASET_NAME = "production";
let QUERY_TESTIMONIAL = `*[_type=="testimonials"]`;
let URL_TESTIMONIAL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET_NAME}?query=${QUERY_TESTIMONIAL}`;

fetch(URL_TESTIMONIAL)
  .then((response) => response.json())
  .then(({ result }) => {
    let testimonials = document.querySelector("#testimonials-list");
    if (result.length > 0) {
      result.forEach((testimonial) => {
        let testimonialCard = document.createElement("div");
        testimonialCard.classList.add(
          "testimonial-card",
          "columns",
          "is-flex-wrap-wrap"
        );

        let testimonialImg = document.createElement("div");
        testimonialImg.classList.add("testimonial-img", "column", "is-4");

        let img = document.createElement("img");

        const inputString = testimonial.image.asset._ref;
        const regex = /image-(.*?)(-\d+x\d+)?-(\w+)/;
        const match = inputString.match(regex);
        const fileName = match[1] + (match[2] || "") + "." + match[3];
        img.src = `https://cdn.sanity.io/images/${PROJECT_ID}/${DATASET_NAME}/${fileName}`;
        testimonialImg.appendChild(img);

        let testimonialContent = document.createElement("div");
        testimonialContent.classList.add(
          "testimonial-content",
          "column",
          "is-8"
        );

        let testimonialTitle = document.createElement("div");
        testimonialTitle.classList.add("testimonial-title");
        testimonialTitle.textContent = `${testimonial.name}`;
        testimonialContent.appendChild(testimonialTitle);

        let testimonialSubtitle = document.createElement("div");
        testimonialSubtitle.classList.add("testimonial-subtitle");
        testimonialSubtitle.textContent = `${testimonial.position}`;
        testimonialContent.appendChild(testimonialSubtitle);

        let testimonialP = document.createElement("div");
        testimonialP.classList.add("testimonial-p");
        testimonialP.textContent = `${testimonial.testimonial}`;
        testimonialContent.appendChild(testimonialP);

        testimonialCard.appendChild(testimonialImg);
        testimonialCard.appendChild(testimonialContent);

        testimonials.appendChild(testimonialCard);
      });
    }
  });

let QUERY_WORKS = `*[_type=="works"]`;
let URL_WORKS = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET_NAME}?query=${QUERY_WORKS}`;
fetch(URL_WORKS)
  .then((response) => response.json())
  .then((result) => {
    let data = result.result
    let works = document.querySelector("#works");
    if (data.length > 0) {
      data.forEach((work, index) => {
        // Створюємо основний контейнер
        const recentWorkDiv = document.createElement("div");
        recentWorkDiv.classList.add("recent-work-div");
      
        // Створюємо контейнер для зображення
        const workImageDiv = document.createElement("div");
        workImageDiv.classList.add("work-image-div");
      
        // Створюємо зображення
        const img = document.createElement("img");
        const inputString = work.image.asset._ref;
        const regex = /image-(.*?)(-\d+x\d+)?-(\w+)/;
        const match = inputString.match(regex);
        const fileName = match[1] + (match[2] || "") + "." + match[3];
        img.src = `https://cdn.sanity.io/images/${PROJECT_ID}/${DATASET_NAME}/${fileName}`;
      
        img.setAttribute("loading", "lazy");
        img.setAttribute(
          "sizes",
          "(max-width: 479px) 92vw, (max-width: 767px) 95vw, (max-width: 1279px) 48vw, (max-width: 1919px) 49vw, 799px"
        );
      
        img.setAttribute("alt", "");
      
        // Додаємо зображення до контейнера для зображення
        workImageDiv.appendChild(img);
      
        // Створюємо контейнер для опису
        const workDescriptionDiv = document.createElement("div");
        workDescriptionDiv.classList.add("work-description-div");
      
        // Створюємо контейнер для тексту опису
        const descriptionTextDiv = document.createElement("div");
        descriptionTextDiv.classList.add("description-text-div");
      
        // Створюємо назву проекту
        const nameOfTheProject = document.createElement("div");
        nameOfTheProject.classList.add("name-of-the-project");
        nameOfTheProject.textContent = `${work.name}`;
      
        // Створюємо роздільник
        const projectTextDivider = document.createElement("div");
        projectTextDivider.classList.add("project-text-divider");
      
        // Створюємо текст опису проекту
        const projectDescriptionText = document.createElement("div");
        projectDescriptionText.classList.add("project-description-text");
        projectDescriptionText.textContent = `${work.description}`;
      
        // Створюємо контейнер для тегів
        const projectDescriptionTags = document.createElement("div");
        projectDescriptionTags.classList.add("project-description-tags");
      
        let tags = work.tags;
        tags.forEach((tag) => {
          const tag1 = document.createElement("div");
          tag1.classList.add("tag-outline", "has-text-primary");
          tag1.textContent = tag;
          projectDescriptionTags.appendChild(tag1);
        });
        // Створюємо теги
      
        // Додаємо всі елементи до їх батьківських контейнерів
        descriptionTextDiv.appendChild(nameOfTheProject);
        descriptionTextDiv.appendChild(projectTextDivider);
        descriptionTextDiv.appendChild(projectDescriptionText);
        descriptionTextDiv.appendChild(projectDescriptionTags);
      
        workDescriptionDiv.appendChild(descriptionTextDiv);
      
        recentWorkDiv.appendChild(workImageDiv);
        recentWorkDiv.appendChild(workDescriptionDiv);
      
        // Додаємо комбо клас "reverse-recent-work-div" кожному другому елементу
        if (index % 2 === 1) {
          recentWorkDiv.classList.add("reverse-recent-work-div");
        }
      
        // Додаємо основний контейнер до DOM
        works.appendChild(recentWorkDiv);
      });
    }
  });

 