const sentence = document.querySelector("#sentence");

const getDescription = async () => {
  try {
    const res = await fetch("https://craig.cloudmodule.codeyourfuture.io/sentence");
    const data = await res.json();
    sentence.innerText = data;
  } catch (err) {
    console.error(err);
  }
};

getDescription();
