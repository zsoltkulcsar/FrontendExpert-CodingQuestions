const API_BASE_URL = "https://api.frontendexpert.io/api/fe/testimonials";
const testimonialContainer = document.getElementById("testimonial-container");

const limit = 5;
let after = null;
let canLoadMore = true;

const getUrl = () => {
  const url = new URL(API_BASE_URL);
  url.searchParams.append("limit", limit);
  if (after !== null) url.searchParams.append("after", after);
  return url;
};

const appendTestimonialToDOM = (message) => {
  const div = document.createElement("div");
  div.innerText = message;
  div.classList.add("testimonial");
  testimonialContainer.appendChild(div);
};

const appendTestimonialsToDOM = (testimonials) => {
  for (let i = 0; i < testimonials.length; i++) {
    const { message, id } = testimonials[i];
    appendTestimonialToDOM(message);
    if (i === testimonials.length - 1) after = id;
  }
};

async function handleScroll() {
  if (!canLoadMore) return;

  const scrollValue =
    testimonialContainer.scrollHeight -
    testimonialContainer.scrollTop -
    testimonialContainer.clientHeight;

  if (scrollValue > 0) return;

  canLoadMore = false;

  try {
    const url = getUrl();
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch testimonials");

    const { testimonials, hasNext } = await res.json();
    appendTestimonialsToDOM(testimonials);

    canLoadMore = hasNext;
  } catch (error) {
    console.error("Error fetching testimonials:", error);
  }
}

async function init() {
  await handleScroll();
  if (testimonialContainer) {
    testimonialContainer.addEventListener("scroll", handleScroll);
  } else {
    console.error("Element with ID 'testimonial-container' not found.");
  }
}

init();
