import openai

openai.api_key = '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'

def fetch_response_from_gpt3(prompt):
    response = openai.Completion.create(
      engine="text-davinci-002",
      prompt=prompt,
      max_tokens=150
    )
    return response.choices[0].text.strip()

def fetch_conversation_history():
    # This function needs to be implemented based on how you're storing the conversation history.
    # If you're storing the history in a database, you need to fetch it from there.
    pass
