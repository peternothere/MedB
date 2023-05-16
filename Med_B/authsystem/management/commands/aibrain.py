import openai
from django.core.management.base import BaseCommand
from dotenv import load_dotenv
import os
import time

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

    prompt = f'{chat_log[:2000]}You: {question}\nSnowWhite: '  # Reduce prompt length to fit within the context limit
    response = completion.create(
        model="text-davinci-002",
        prompt=prompt,
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


class Command(BaseCommand):
    help = 'Starts the AI Brain'

    def handle(self, *args, **options):
        while True:
            with open(query_file_path, "r") as file:
                query = file.read().strip()

            if query:
                response_content = ReplayBrain(query)
                with open(response_file_path, "w") as file:
                    file.write(response_content)
                self.stdout.write(f"Query: {query}")
                self.stdout.write(f"Response: {response_content}")

            time.sleep(1)
