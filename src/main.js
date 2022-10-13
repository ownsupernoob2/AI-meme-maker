const { Configuration, OpenAIApi } = require("openai");
var Filter = require("bad-words");

// const SerpApi = require("google-search-results-nodejs");

// const search = new SerpApi.GoogleSearch('bb943b6380ad5f771b8b00885027bdfd6ee6f65a1870fc76010c52081aeb04d0'); //your API key from serpapi.com

// const searchQuery = "bugatti chiron";

// const params = {
//   q: searchQuery, 
//   engine: "google",
//   hl: "en",
//   gl: "us", 
//   tbm: "isch",
// };
document.getElementById("loading").innerHTML = "";

// console.log("hi")

// console.log(document.getElementById('textbox_id').value)
// const getJson = () => {
//   return new Promise((resolve) => {
//     search.json(params, resolve);
//   });
// };

// const getResults = async () => {
//   const imagesResults = [];
//   while (true) {
//     const json = await getJson();
//     if (json.images_results) {
//       imagesResults.push(...json.images_results);
//       params.ijn ? (params.ijn += 1) : (params.ijn = 1);
//     } else break;
//   }

//   return imagesResults;
// };


const memeMaker = async () => {
    let filter = new Filter();
    
    const inputValue = document.getElementById("myInput").value;
    if (inputValue == "") {
        document.getElementById("meme").innerHTML = "Hey look guys I found John Cena!!11!:";
    } else {
        
        const censoredText = filter.clean(inputValue);
      if(censoredText.includes("*") || censoredText == 'bad word') {
          document.getElementById("meme").innerHTML = "You rn: 🤡";
        } else {
      document.getElementById("meme").innerHTML = "Loading!!";
    const configuration = new Configuration({
        apiKey: null, 
        // personally ask Mina for his API key because he can't share it here.
      });
      const openai = new OpenAIApi(configuration);
    
      const response = await openai.createCompletion({
        model: "text-davinci-002",
        prompt:
          "The following is a conversation with an AI meme maker. The AI is funny, hilarious, original and can make good memes about anything. The AI will replace all swear words, slurs and sexual words with \"No.\" and keep them PG rated.\n\nHuman: Can you make a meme caption about cowboy\nAI: Me before I watch a cowboy film:\nAI: Me after watching a cowboy film:\nHuman: Can you make a meme caption about health\nAI: Me: I'm gonna start eating healthy\nAI: Also me: Treat yourself one last time, you deserve it\nHuman: an you make a meme caption about sleep\nAI: Me: I'm going to bed early tonight\nAlso me: 2am is early enough, right?\nHuman: Can you make a meme caption about cats\nAI: My cat listening to my rants:\nHuman: Can you make a meme caption about cats\nAI: My Keyboard: *Exists* My Cat: It's Free Real Estate\nHuman: Can you make a meme caption about Shrek\nAI: Me: I found a swamp!\nHuman: Can you make a meme caption about school\nAI: When the teacher forgets to check in the homework on the day you actually did it\nHuman: can you make a meme caption about situation\nAI: trying to make a situation better and accidentally making it worse\nHuman: can you make a meme caption about class\nAI: Teacher: \"Guys pay attention!\"\nAI: The kid named attention:\nAI: the rest of the class:\nHuman: can you make a meme caption about joke\nAI: When your friend repeats your joke louder and the whole class laughs.\nHuman: can you make a meme caption about Blimp Academy\nAI: When you do all the work but still credit your team blimpies:\nHuman: Can you create a meme caption about cats\nAI: My cat sleeping through my entire breakdown:\nHuman: Can you create a meme caption about cards\nAI: When the game is rigged and you still end up winning:\nHuman: Can you create a meme caption about mirror\nAI: When you're getting ready for a date and your reflection is questioning you:\nHuman: Can you create a meme caption about teacher\nAI: Teacher: \"I'm going to talk to your parents\"\nYou: \"I'm an orphan, so you can't talk to my parents\"\nHuman: Can you create a meme caption about American Civil War\nAI: You're about to fight for your life but you also want to take a selfie:\nHuman: Can you make a meme caption about " +
          inputValue,
        temperature: 0.9,
        max_tokens: 150,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0.6,
        stop: [" Human:", " AI:"],
      });
    
      const AiResponse = await response.data.choices[0].text.replace("AI: ", "");

      const censoredAI =  await filter.clean(AiResponse)
       

      document.getElementById("meme").innerHTML = "" + censoredAI;
    
    
  }
}


};

const element = document.getElementById("addBtn");
element.addEventListener("click", memeMaker);
