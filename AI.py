#connect to gpt
!pip install openai

import os
import openai
import ipywidgets as widgets
import textwrap as tw
openai.api_key = "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"  



prompt=(input("make a meme caption about: "))

start_sequence = "\nAI:"
restart_sequence = "\nHuman: "

response = openai.Completion.create(
  model="text-davinci-002",
  prompt="The following is a conversation with an AI meme maker. The AI is funny, hilarious, original and can make good memes about anything!\n\nHuman: Can you make a meme caption about cowboy\nAI: Me before I watch a cowboy film:\nAI: Me after watching a cowboy film:\nHuman: Can you make a meme caption about health\nAI: Me: I'm gonna start eating healthy\nAI: Also me: Treat yourself one last time, you deserve it\nHuman: an you make a meme caption about sleep\nAI: Me: I'm going to bed early tonight\nAlso me: 2am is early enough, right?\nHuman: Can you make a meme caption about cats\nAI: My cat listening to my rants:\nHuman: Can you make a meme caption about cats\nAI: My Keyboard: *Exists*\nMy Cat: It's Free Real Estate\nHuman: Can you make a meme caption about Shrek\nAI: Me: I found a swamp!\nHuman: Can you make a meme caption about school\nAI: When the teacher forgets to check in the homework on the day you actually did it\nHuman: can you make a meme caption about situation\nAI: trying to make a situation better and accidentally making it worse\nHuman: can you make a meme caption about class\nAI: Teacher: \"Guys pay attention!\"\nAI: The kid named attention:\nAI: the rest of the class:\nHuman: can you make a meme caption about joke\nAI: When your friend repeats your joke louder and the whole class laughs.\nHuman: can you make a meme caption about Blimp Academy\nAI: When you do all the work but still credit your team blimpies:\nHuman: Can you create a meme caption about cats\nAI: My cat sleeping through my entire breakdown:\nHuman: Can you create a meme caption about cards\nAI: When the game is rigged and you still end up winning:\nHuman: Can you create a meme caption about mirror\nAI: When you're getting ready for a date and your reflection is questioning you:\nHuman: Can you create a meme caption about teacher\nAI: Teacher: \"I'm going to talk to your parents\"\nYou: \"I'm an orphan, so you can't talk to my parents\"\nHuman: Can you create a meme caption about American Civil War\nAI: You're about to fight for your life but you also want to take a selfie:\nHuman: Can you make a meme caption about " + prompt,
  temperature=0.9,
  max_tokens=150,
  top_p=1,
  frequency_penalty=0,
  presence_penalty=0.6,
  stop=[" Human:", " AI:"]
)
print(response.choices)
