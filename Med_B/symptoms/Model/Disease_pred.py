import pickle
import numpy as np
import pandas as pd
import os

# Get the absolute path of the directory containing Disease_pred.py
base_dir = os.path.dirname(os.path.abspath(__file__))

# Construct the absolute path to the pkl file
pkl_file = os.path.join(base_dir, 'disease_pred.pkl')

# Construct the absolute path to the csv file
csv_file = os.path.join(base_dir, 'Training.csv')

def result(symptoms):
    with open(pkl_file, 'rb') as f:
        model = pickle.load(f)

    df = pd.read_csv(csv_file)
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

    user_symptoms = map_symptoms(symptoms)
    user_symptoms = np.array(user_symptoms).reshape(1, -1)

    prediction = model.predict(user_symptoms)

    return prediction[0]

def get_symptoms():
    symptom_str = input("Enter symptoms separated by commas: ")
    symptoms = [symptom.strip() for symptom in symptom_str.split(",")]
    return symptoms

user_symptom = get_symptoms()
predicted_disease = result(user_symptom)

print("You May Have " + predicted_disease + ".")
print("Consult a Physician as soon as possible.")
