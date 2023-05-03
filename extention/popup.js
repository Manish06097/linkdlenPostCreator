document.getElementById("send-button").addEventListener("click", async (event) => {
  event.preventDefault();
  const details = document.getElementById("Details").value;
  const responseContainer = document.getElementById("gpt-response");

  if (details) {
    responseContainer.textContent = "Generating response...";
    const postType = document.getElementById("post-type").value;
      const ContentType = document.getElementById("Content-Type").value;  
      var apiKeyInput = document.getElementById("ApiKey").value;  
        let prompt = `You are a linkedin post creator AI that uses the basic details to create  post .details-: \n
    post-type -: ${postType}\n
    description -: ${details}\n
    make it ${ContentType}\n and include seo Specified Hastags output should be in the Html String`
      const response = await fetchChatGPTResponse(prompt,apiKeyInput);
      responseContainer.innerHTML = response;
  }
});

async function fetchChatGPTResponse(prompt,apiKeyInput) {
    const serverEndpoint = "https://api1-1-q9627518.deta.app/chatgpt";
    console.log(apiKeyInput)

  const body = JSON.stringify({
      prompt: prompt,
      key:apiKeyInput
  });

  try {
      const response = await fetch(serverEndpoint, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: body,
      });

      if (response.ok) {
          const data = await response.json();
          return data.response;
      } else {
          throw new Error("Failed to fetch response from ChatGPT API");
      }
  } catch (error) {
      console.error(error);
      return "Error: Unable to generate a response.";
  }
}