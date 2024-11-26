import random
import json
import pickle
import numpy as np
import os
from pymongo import MongoClient
import certifi

import nltk
from nltk.stem import WordNetLemmatizer

from tensorflow.keras.models import load_model

# Initialize Lemmatizer
lemmatizer = WordNetLemmatizer()

# Define paths
base_dir = os.path.dirname(os.path.abspath(__file__))
data_path = os.path.join(base_dir, '..', 'data', 'intents.json')
model_dir = os.path.join(base_dir, 'model')
model_path = os.path.join(model_dir, 'chatbot_model.h5')
words_path = os.path.join(model_dir, 'words.pkl')
classes_path = os.path.join(model_dir, 'classes.pkl')

# Download necessary NLTK data (optional if already downloaded)
nltk.download('punkt')
nltk.download('wordnet')
nltk.download('omw-1.4')

# Load intents.json
with open(data_path, 'r') as file:
    intents = json.load(file)

# Load words and classes
with open(words_path, 'rb') as f:
    words = pickle.load(f)

with open(classes_path, 'rb') as f:
    classes = pickle.load(f)

# Load the trained model
model = load_model(model_path)

def clean_up_sentence(sentence):
    """
    Tokenizes and lemmatizes the input sentence.
    """
    sentence_words = nltk.word_tokenize(sentence)
    sentence_words = [lemmatizer.lemmatize(word.lower()) for word in sentence_words]
    return sentence_words

def bow(sentence, words, show_details=True):
    """
    Creates a bag-of-words representation of the input sentence.
    """
    sentence_words = clean_up_sentence(sentence)
    bag = [0] * len(words)
    for s in sentence_words:
        for i, w in enumerate(words):
            if w == s:
                bag[i] = 1
                if show_details:
                    print(f'Found in bag: {w}')
    return np.array(bag)

def predict_class(sentence, model):
    """
    Predicts the class (intent) of the input sentence.
    """
    p = bow(sentence, words, show_details=False)
    res = model.predict(np.array([p]))[0]
    ERROR_THRESHOLD = 0.25
    results = [[i, r] for i, r in enumerate(res) if r > ERROR_THRESHOLD]

    # Sort by probability
    results.sort(key=lambda x: x[1], reverse=True)

    return_list = []
    for r in results:
        return_list.append({'intent': classes[r[0]], 'probability': str(r[1])})

    return return_list

def get_response(intents_list, intents_json, message):
    """
    Retrieves a random response from the list of possible responses for the predicted intent.
    """
    if not intents_list:
        return "I'm sorry, I didn't understand that."

    tag = intents_list[0]['intent']
    list_of_intents = intents_json['intents']
    for i in list_of_intents:
        if i['tag'] == tag:
            if i['tag'] == "General comparison":
                return get_general_comparison_response(message)
            else:
                return random.choice(i['responses'])

    return "I'm sorry, I didn't understand that."

def get_general_comparison_response(user_input):
    medicines_in_user_input = parse_for_medicines(user_input)

    if len(medicines_in_user_input) == 2:

        # connect to MongoDB
        client = MongoClient('mongodb+srv://pragathidurgarajarajan:healthsifters@healthsiftdb.zjgq3.mongodb.net/', tlsCAFile=certifi.where())

        # get the database 
        db = client['healthsiftDB'] 

        # get the collection 
        medicine_collection = db['medicine']

        # save medicine names in variables for ease of use 
        medicine1_name = medicines_in_user_input[0]
        medicine2_name = medicines_in_user_input[1]

        # get documents from database for the two medicines 
        medicine1_document = medicine_collection.find_one({"Medicine Name": medicine1_name})
        medicine2_document = medicine_collection.find_one({"Medicine Name": medicine2_name})

        # get uses of each medicine
        medicine1_use = medicine1_document['Medicine Use']
        medicine2_use = medicine2_document['Medicine Use']

        # response to send back to user 
        response = f"{medicine1_name} {medicine1_use.lower()}. On the other hand, {medicine2_name} {medicine2_use.lower()}."
        return response
    
    else:
        return f"Please mention exactly two medicines if you would like me to compare them for you"

def parse_for_medicines(user_input):
    # TODO: this functions expects that the user input contains the medicines full names and with perfect spelling. Making this more dynamic would be good

    # connect to MongoDB
    client = MongoClient('mongodb+srv://pragathidurgarajarajan:healthsifters@healthsiftdb.zjgq3.mongodb.net/', tlsCAFile=certifi.where())

    # get the database 
    db = client['healthsiftDB'] 

    # get the collection 
    medicine_collection = db['medicine']

    # create list of all medicine names
    medicines = []
    for medicine_entry in medicine_collection.find():
        # get medicine name 
        name_medicine = medicine_entry['Medicine Name']
        medicines.append(name_medicine)

    # check which medicine names the text contains
    medicines_in_input = []
    for medicine in medicines:
        if medicine.lower() in user_input.lower():
            medicines_in_input.append(medicine)

    # return the medicine names that were found in the user's input
    return medicines_in_input

def get_chatbot_response(user_input):
    
    # send user input to chatbot and get response 
    intents_list = predict_class(user_input, model)
    response = get_response(intents_list, intents, user_input)

    print(response) # testing purposes  

    # return chatbot's response 
    return response 
    
# interaction loop
if __name__ == "__main__":
    print("Start chatting with the bot (type 'quit' to stop)!")
    while True:
        message = input("> ")
        if message.lower() == "quit":
            print("Goodbye!")
            break

        intents_list = predict_class(message, model)
        response = get_response(intents_list, intents, message)
        print(response)

''' Brainstorming ways to handle medicine comparison '''
# intents_list = predict_class(message, model)
# if intents_list[select class with highest probability] == medicine comparison
    # parse for medicine 1 and medicine 2 
    # get data on medicine 1 and medicine 2 from the database 
    # print response 