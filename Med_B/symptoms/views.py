from django.shortcuts import render
import pickle
import numpy as np
import pandas as pd
import os



# Get the absolute path of the directory containing views.py
base_dir = os.path.dirname(os.path.abspath(__file__))

# Construct the absolute path to the pkl file
pkl_file = os.path.join(base_dir, 'disease_pred.pkl')


# Load the model
with open('disease_pred.pkl', 'rb') as f:
    model = pickle.load(f)

df = pd.read_csv('Training.csv')
df.drop('Unnamed: 133', axis=1, inplace=True)

def map_symptoms(symptoms):
    dataset_symptoms = df.columns.tolist()
    dataset_symptoms.pop()
    mapped_symptoms = [0] * len(dataset_symptoms)

    for symptom in symptoms:
        symptom = symptom.strip().replace(' ', '_')
        if symptom in dataset_symptoms:
            mapped_symptoms[dataset_symptoms.index(symptom)] = 1

    return mapped_symptoms

"""def index(request):
    if request.method == 'POST':
        symptoms = request.POST.get('symptoms', '')
        user_symptoms = [symptom.strip() for symptom in symptoms.split(",")]
        mapped_symptoms = map_symptoms(user_symptoms)
        s = np.array(mapped_symptoms).reshape(1, -1)

        prediction = model.predict(s)

        predicted_disease = prediction[0]
        return render(request, 'symptoms/result.html', {'predicted_disease': predicted_disease})

    return render(request, 'symptoms/index.html')"""

# views.py

def index(request):
    if request.method == 'POST':
        symptoms = []
        for i in range(1, 6):
            symptom = request.POST.get(f'symptom{i}', '')
            if symptom.strip():
                symptoms.append(symptom.strip())
        
        mapped_symptoms = map_symptoms(symptoms)
        s = np.array(mapped_symptoms).reshape(1, -1)

        prediction = model.predict(s)

        predicted_disease = prediction[0]
        return render(request, 'symptoms/index.html', {'predicted_disease': predicted_disease})

    return render(request, 'symptoms/index.html')
