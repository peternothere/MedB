# management/__init__.py
import os

# This line allows Django to discover the custom management command
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Med_B.settings')
