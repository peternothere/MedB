import threading
import subprocess
import time
import os

def run_aibrain():
    while True:
        # Read the content of query.txt
        with open("static/authsystem/query.txt", "r") as query_file:
            query = query_file.read().strip()

        # Run AIBrain.py with the query as a command-line argument
        subprocess.call(['python', 'AIBrain.py', query])

        # Wait for some time before checking for new queries
        time.sleep(1)

if __name__ == '__main__':
    threading.Thread(target=run_aibrain).start()
