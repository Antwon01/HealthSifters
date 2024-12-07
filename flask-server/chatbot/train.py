import random
import json
import pickle
import numpy as np
import os

import nltk
from nltk.stem import WordNetLemmatizer

from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Activation, Dropout
from tensorflow.keras.optimizers import SGD

nltk.download('punkt_tab') # for use with tokenizing 

# Initialize Lemmatizer (for reducing words (ex. running --> run))
lemmatizer = WordNetLemmatizer()

# Define paths
base_dir = os.path.dirname(os.path.abspath(__file__)) # curr directory
data_path = os.path.join(base_dir, '..', 'data', 'intents.json') # path to data file (intents.json)
model_dir = os.path.join(base_dir, 'model') # path to the model directory
model_path = os.path.join(model_dir, 'chatbot_model.h5') # path to the model 
words_path = os.path.join(model_dir, 'words.pkl') # path to words.pkl
classes_path = os.path.join(model_dir, 'classes.pkl') # path to classes.pkl

# Ensure the model directory exists
os.makedirs(model_dir, exist_ok=True) # create model directory if it does not exist

# Download necessary NLTK data
nltk.download('punkt')
nltk.download('wordnet') 
nltk.download('omw-1.4')

# Load intents.json
with open(data_path, 'r') as file:
    intents = json.load(file)

words = []
classes = []
documents = []
ignore_letters = ['?', '!', '.', ',']

# Tokenize patterns and build words and classes lists
for intent in intents['intents']: # for each intent 
    for pattern in intent['patterns']: # for each pattern
        word_list = nltk.word_tokenize(pattern) # tokenize pattern
        words.extend(word_list) # add tokens to words list
        documents.append((word_list, intent['tag'])) # adds tokens and it's intent as a tag to documents 
        if intent['tag'] not in classes:
            classes.append(intent['tag']) # add this intent to classes if it's not already in it

# Lemmatize and clean words
words = [lemmatizer.lemmatize(word.lower()) for word in words if word not in ignore_letters]
words = sorted(set(words))

# Sort classes
classes = sorted(set(classes)) # sorting classes

# Save words and classes using pickle
with open(words_path, 'wb') as f:
    pickle.dump(words, f)

with open(classes_path, 'wb') as f:
    pickle.dump(classes, f)

# Prepare training data
training = [] # for holding training data 
output_empty = [0] * len(classes) # one hot encoded for class? 

for document in documents:
    bag = [] # to represent bag of words 
    word_patterns = document[0] # gets tokenized words from document 
    word_patterns = [lemmatizer.lemmatize(word.lower()) for word in word_patterns] # lemmatizes it 
    for word in words:
        bag.append(1 if word in word_patterns else 0) # 1 or 0 for each word in the model's vocab depending on whether it was in the pattern 

    output_row = list(output_empty) # copying the list of 0s
    output_row[classes.index(document[1])] = 1 # sets corresponding label to 1
    training.append([bag, output_row]) # add bag and output_row to the training data

# Shuffle the training data
random.shuffle(training) # randomize the order of it 

# Separate features and labels
train_x = [item[0] for item in training] # features (bag)
train_y = [item[1] for item in training] # labels (class)

# Convert to NumPy arrays
train_x = np.array(train_x)
train_y = np.array(train_y)

# Verify shapes
print(f"train_x shape: {train_x.shape}")
print(f"train_y shape: {train_y.shape}")

# Build the model
model = Sequential()
model.add(Dense(128, input_shape=(len(train_x[0]),), activation='relu')) # dense layer with 128 unit; activation function is relu
model.add(Dropout(0.5)) # randomly drop 50% neurons to prevent overfitting
model.add(Dense(64, activation='relu')) # dense layer with 64 units; activation function is relu 
model.add(Dropout(0.5)) # drop 50% randomly to preven toverfitting
model.add(Dense(len(train_y[0]), activation='softmax')) # dense layer with same num units as num classes; activation function is softmax 

# Compile the model
sgd = SGD(learning_rate=0.01, decay=1e-6, momentum=0.9, nesterov=True) # stochastic gradient descent 
model.compile(loss='categorical_crossentropy', optimizer=sgd, metrics=['accuracy'])

# Train the model
hist = model.fit(train_x, train_y, epochs=750, batch_size=5, verbose=1)

# Save the model in H5 format (correct usage)
model.save(model_path)
print('Bot is running!')