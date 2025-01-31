import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
 dangerouslyAllowBrowser: true,
});

const form = document.querySelector("#posterForm");
const movieTitle = document.querySelector("#movie-title");
const artStyles = document.querySelector("#art-styles");
const posterOutput = document.querySelector("#poster-output");
const loading = document.querySelector("#loading");

form.addEventListener("submit", function (event) {
  event.preventDefault();
 
  generatePoster(movieTitle, artStyles);
  form.reset();
});

async function generatePoster(title, style) {
  const prompt = `Poster of the movie "${title.value}" in ${style.value} style`;
  loading.style.display = "block";
  
  try {
    const image = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt
    });
    // console.log(image.data);
    
    posterOutput.innerHTML = `<figure>
    <img src=${image.data[0].url} alt="AI-generated image">
    <figcaption>${prompt}</figcaption>
    </figure>`;
  } catch (error) {
    console.log(error);
    posterOutput.textContent = "Sorry, an error is occuring";
  } finally {
    loading.style.display = "none";
  }
}
