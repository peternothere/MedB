import openai
from dotenv import load_dotenv
import os

API = "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"

openai.api_key = API
load_dotenv()
completion = openai.Completion()

# File paths
query_file_path = os.path.join(os.path.dirname(__file__), "static", "authsystem", "query.txt")
chat_log_file_path = os.path.join(os.path.dirname(__file__), "chat_log.txt")
response_file_path = os.path.join(os.path.dirname(__file__), "static", "authsystem", "response.txt")

def ReplayBrain(question, chat_log=None):
    chat_log_template = ""

    with open(chat_log_file_path, "r") as file:
        chat_log_template = file.read()

    if chat_log is None:
        chat_log = chat_log_template

    prompt = f'{chat_log[:2000]}You: {question}\nMed-B : '  # Reduce prompt length to fit within the context limit
    response = completion.create(
        model="text-davinci-002",
        prompt=prompt, #+ "Assume yourself as a medical exper named Med-B.",
        temperature=0.5,
        max_tokens=100,  # Adjust the maximum tokens as needed
        top_p=0.3,
        frequency_penalty=0.5,
        presence_penalty=0
    )
    answer = response.choices[0].text.strip()
    chat_log_template_update = chat_log_template + f"\nYou: {question}\nSnowWhite: {answer}"

    with open(chat_log_file_path, "w") as file:
        file.write(chat_log_template_update)

    return answer

"""while True:
    with open(query_file_path, "r") as file:
        query = file.read().strip()

    # Perform some operations or processing to generate the response
    response_content = ReplayBrain(query)

    # Write the response to response.txt
    with open(response_file_path, "w") as file:
        file.write(response_content)
    print(ReplayBrain(query))"""


