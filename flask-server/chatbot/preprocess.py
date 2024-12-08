from pymongo import MongoClient
import re
import json 
import certifi
from cryptography.fernet import Fernet

# iterates over the medicine collections and prints json of each medicine document 
def print_medicines(medicine_collection):
    for medicine_entry in medicine_collection.find():
        print(medicine_entry)

# add side effects of each medicine to intents.json
def add_side_effects_to_intents(medicine_collection, intents_path):
    # iterate over medicines
    for medicine_entry in medicine_collection.find():
        # get medicine name
        name_medicine = medicine_entry['Medicine Name']

        # get medicine use
        side_effect_medicine = medicine_entry['Medicine Side Effects']

        # side effects are semi-colon deliminated, so replace ; with , for usage 
        side_effect_processed = side_effect_medicine.replace(";", ",")
        # add 'and' to make list of side effects grammatically correct 
        for i in range(len(side_effect_processed) - 1, -1, -1):
            if side_effect_processed[i] == ',':
                side_effect_processed = side_effect_processed[ : i + 1] + " and" + side_effect_processed[i + 1 : ]
                break

        # testing purposes 
        # print(side_effect_processed)

        # generate response(s)
        response1 = f"{name_medicine} can have side effects including {side_effect_processed.lower()}"
        responses = [response1]

        names = [name_medicine, name_medicine.lower().split()[0]]
        patterns = []

        for name in names:
            # generate patterns
            pattern1 = f"What side effects does {name} have"
            pattern2 = f"What side effects does {name} cause"
            pattern3 = f"what are the side effects of {name}"
            pattern4 = f"side effects {name}"
            pattern5 = f"{name} side effects"
            pattern6 = f"{name} effects"
            pattern7 = f"effects of {name}"
            pattern8 = f"side effects of {name}"
            patterns_temp = [pattern1, pattern2, pattern3, pattern4, pattern5, pattern6, pattern7, pattern8]

            for pattern in patterns_temp:
                patterns.append(pattern)


        # make json entry 
        new_uses_intent = {
            "tag": f"Side effects of {name_medicine}",
            "patterns":  patterns,
            "responses": responses,
            "context_set": ""
        }

        # save to intents.json
        with open(intents_path, 'r+') as file:
            # load data in intents.json
            data = json.load(file)

            # add new_uses_intent into data from intents.json
            data["intents"].append(new_uses_intent)

            # move to beginning of intents.json file 
            file.seek(0)
    
            # write data back to intents.json
            json.dump(data, file, indent=2)
    
        print("")

# add ingredients of each medicine to intents.json
def add_ingredients_to_intents(medicine_collection, intents_path):
    # iterate over medicines
    for medicine_entry in medicine_collection.find():
        # get medicine name
        name_medicine = medicine_entry['Medicine Name']

        # get medicine use
        ingredients_medicine = medicine_entry['Medicine Ingredients']

        # ingredients are semi-colon deliminated, so replace ; with , for usage 
        ingredients_processed = ingredients_medicine.replace(";", ",")
        # if str was changed, then there are multiple listed ingredients, so process accordingly 
        if ingredients_medicine != ingredients_processed:
            # add 'and' to make list of ingredients grammatically correct 
            for i in range(len(ingredients_processed) - 1, -1, -1):
                if ingredients_processed[i] == ',':
                    ingredients_processed = ingredients_processed[ : i + 1] + " and" + ingredients_processed[i + 1 : ]
                    break
        
        # testing purposes 
        # print(ingredients_processed)

        # generate response(s)
        response1 = ""
        if ingredients_medicine == ingredients_processed:
            response1 = f"An ingredient that {name_medicine} contains is {ingredients_processed}"
        else:
            response1 = f"Some of the ingredients that {name_medicine} contains are {ingredients_processed}"
        responses = [response1]

        names = [name_medicine, name_medicine.lower().split()[0]]
        patterns = []

        for name in names:
            # generate patterns
            pattern1 = f"What ingredients does {name} have"
            pattern2 = f"Ingredients of {name}"
            pattern3 = f"what are the ingredients in {name}"
            pattern4 = f"ingredients {name}"
            pattern5 = f"{name} ingredients"
            pattern6 = f"{name} composition"
            pattern7 = f"composition of {name}"
            pattern8 = f"what is {name} composed of"
            patterns_temp = [pattern1, pattern2, pattern3, pattern4, pattern5, pattern6, pattern7, pattern8]

            for pattern in patterns_temp:
                patterns.append(pattern)


        # make json entry 
        new_uses_intent = {
            "tag": f"Ingredients of {name_medicine}",
            "patterns":  patterns,
            "responses": responses,
            "context_set": ""
        }

        # save to intents.json
        with open(intents_path, 'r+') as file:
            # load data in intents.json
            data = json.load(file)

            # add new_uses_intent into data from intents.json
            data["intents"].append(new_uses_intent)

            # move to beginning of intents.json file 
            file.seek(0)
    
            # write data back to intents.json
            json.dump(data, file, indent=2)
    
        print("")

# add use of each medicine to intents.json
def add_uses_to_intents(medicine_collection, intents_path):
    # iterate over medicines
    for medicine_entry in medicine_collection.find():
        # get medicine name
        name_medicine = medicine_entry['Medicine Name']

        # get medicine use
        use_medicine = medicine_entry['Medicine Use']

        # generate response(s)
        response1 = f"{name_medicine} {use_medicine.lower()}"
        responses = [response1]

        # generate patterns
        names_split = name_medicine.split()
        # names are first word of medicine or full medicine name 
        names = [names_split[0], name_medicine]

        patterns = []
        for name in names:
            pattern1 = f"What is {name} used for"
            pattern2 = f"What are uses of {name}"
            pattern3 = f"What can  I use {name} for"
            pattern4 = f"What is {name}"
            pattern5 = f"{name}"
            pattern6 = f"What conditions does {name} treat"
            patterns.append(pattern1)
            patterns.append(pattern2)
            patterns.append(pattern3)
            patterns.append(pattern4)
            patterns.append(pattern5)
            patterns.append(pattern6)

        # make json entry 
        new_uses_intent = {
            "tag": f"Uses of {name_medicine}",
            "patterns":  patterns,
            "responses": responses,
            "context_set": ""
        }

        # save to intents.json
        with open(intents_path, 'r+') as file:
            # load data in intents.json
            data = json.load(file)

            # add new_uses_intent into data from intents.json
            data["intents"].append(new_uses_intent)

            # move to beginning of intents.json file 
            file.seek(0)
    
            # write data back to intents.json
            json.dump(data, file, indent=2)
    
        print("")

# add reviews of each medicine to intents.json
def add_review_to_intents(medicine_collection, intents_path):
    # iterate over medicines
    for medicine_entry in medicine_collection.find():
        # get medicine name
        name_medicine = medicine_entry['Medicine Name']

        # get medicine review
        review_medicine = medicine_entry['Medicine Customer Reviews']

        # generate response(s)
        response1 = f"{name_medicine} has {review_medicine.lower()} from customers"
        responses = [response1]

        names = [name_medicine, name_medicine.lower().split()[0]]
        patterns = []

        for name in names:
            # generate patterns
            pattern1 = f"{name} reviews"
            pattern2 = f"Reviews of {name}"
            pattern3 = f"{name} feedback"
            pattern4 = f"What is customer feedback on {name}"
            pattern5 = f"What are customer reviews on {name}"
            pattern6 = f"What do people think of {name}"
            pattern7 = f"Thoughts on {name}"
            patterns_temp = [pattern1, pattern2, pattern3, pattern4, pattern5, pattern6, pattern7]

            for pattern in patterns_temp:
                patterns.append(pattern)

        # make json entry 
        new_uses_intent = {
            "tag": f"Reviews of {name_medicine}",
            "patterns":  patterns,
            "responses": responses,
            "context_set": ""
        }

        # save to intents.json
        with open(intents_path, 'r+') as file:
            # load data in intents.json
            data = json.load(file)

            # add new_uses_intent into data from intents.json
            data["intents"].append(new_uses_intent)

            # move to beginning of intents.json file 
            file.seek(0)
    
            # write data back to intents.json
            json.dump(data, file, indent=2)
    
        print("")

# add links of each medicine to intents.json
def add_link_to_intents(medicine_collection, intents_path):
    # iterate over medicines
    for medicine_entry in medicine_collection.find():
        # get medicine name
        name_medicine = medicine_entry['Medicine Name']

        # get medicine pharmacy link
        link_medicine = medicine_entry['Pharmacy Purchase Link']

        # generate response(s)
        response1 = f"{name_medicine} is available at {link_medicine}"
        responses = [response1]

        names = [name_medicine, name_medicine.lower().split()[0]]
        patterns = []

        for name in names:
            # generate patterns
            pattern1 = f"{name} purchase"
            pattern2 = f"Where can I buy {name}"
            pattern3 = f"Where can I purchase {name}"
            pattern4 = f"Buy {name}"
            pattern5 = f"Get {name}"
            pattern6 = f"Purchase {name}"
            pattern7 = f"Where can I get {name}"
            pattern8 = f"How can I get {name}"
            pattern9 = f"How can I buy {name}"
            pattern10 = f"How can I purchase {name}"
            pattern11 = f"Where can I buy {name}"
            pattern12 = f"Where can I purchase {name}"
            patterns_temp = [pattern1, pattern2, pattern3, pattern4, pattern5, pattern6, pattern7, pattern8, pattern9, pattern10, pattern11, pattern12]

            for pattern in patterns_temp:
                patterns.append(pattern)

        # make json entry 
        new_uses_intent = {
            "tag": f"Link to {name_medicine}",
            "patterns":  patterns,
            "responses": responses,
            "context_set": ""
        }

        # save to intents.json
        with open(intents_path, 'r+') as file:
            # load data in intents.json
            data = json.load(file)

            # add new_uses_intent into data from intents.json
            data["intents"].append(new_uses_intent)

            # move to beginning of intents.json file 
            file.seek(0)
    
            # write data back to intents.json
            json.dump(data, file, indent=2)
    
        print("")

# add 'general comparison' to intents.json
def add_comparison_to_intents(medicine_collection, intents_path):
    paired_comparisons = []
    # iterate over medicines
    for medicine_entry1 in medicine_collection.find():
        for medicine_entry2 in medicine_collection.find():
            # get medicine names of both medicines
            name_medicine1 = medicine_entry1['Medicine Name']
            name_medicine2 = medicine_entry2['Medicine Name']

            # if the two medicines are the same, skip to the next iteration
            if name_medicine1 == name_medicine2:
                continue

            paired_comparison1 = f"Compare {name_medicine1} and {name_medicine2}"
            paired_comparison2 = f"What are differences between {name_medicine1} and {name_medicine2}"

            # medicines can be compared using first word of the name too 
            paired_comparison3 = f"Compare {name_medicine1.split()[0]} and {name_medicine2.split()[0]}"
            paired_comparison4 = f"What are differences between {name_medicine1.split()[0]} and {name_medicine2.split()[0]}"

            paired_comparisons.append(paired_comparison1)
            paired_comparisons.append(paired_comparison2)
            paired_comparisons.append(paired_comparison3)
            paired_comparisons.append(paired_comparison4)

    # make json entry 
    new_uses_intent = {
        "tag": f"General comparison",
        "patterns":  paired_comparisons,
        "responses": ["The user is trying to compare two medicines 2!"],
        "context_set": ""
    }

    # save to intents.json
    with open(intents_path, 'r+') as file:
        # load data in intents.json
        data = json.load(file)

        # add new_uses_intent into data from intents.json
        data["intents"].append(new_uses_intent)

        # move to beginning of intents.json file 
        file.seek(0)

        # write data back to intents.json
        json.dump(data, file, indent=2)

    print("")

# add all intents to intents.json
def insert_intents(medicine_collection, intents_path):
    # insert uses to intents 
    add_uses_to_intents(medicine_collection, intents_path)
    print("added uses to intents")

    # insert side effects to intents
    add_side_effects_to_intents(medicine_collection, intents_path)
    print("added side effects to intents")

    # insert ingredients to intents
    add_ingredients_to_intents(medicine_collection, intents_path)
    print("added ingredients to intents")

    # insert reviews to intents 
    add_review_to_intents(medicine_collection, intents_path)
    print("added reviews to intents")

    # insert pharmacy links to intents
    add_link_to_intents(medicine_collection, intents_path)
    print("added pharmacy links to intents")

    # add intent to detect general comparison
    add_comparison_to_intents(medicine_collection, intents_path)
    print("added general comparison detection to intents")

# main 

# connect to MongoDB
key = b'sPysYuIb5tuI_cqI3X3RwdHih9isqZse81X3I9e_Nys='
encrypted_mongodb_url = b'gAAAAABnVh_wyLcA8K13UxLxq-Fl0s9mE_AW3kxwXSfEAWyp18khjSCN43Lq8EGMpet-TAMxSK5RypiLMERaFipzMicqBt3dw6graVP8IgoHn9YVUQer8cyFw-0N-9pELTmIGLwR9OX0_R7lHLHQu9YcQK_IwVdpitNDsZDNVevGUvvAVyHwDvpZg-QyRhebr-cvKSaTXB1K'
fernet = Fernet(key)
client = MongoClient(fernet.decrypt(encrypted_mongodb_url).decode(), tlsCAFile=certifi.where()) 

# get the database 
db = client['healthsiftDB'] 

# get up collection 
medicine = db['medicine']

# populate intents.json using medicine data 
insert_intents(medicine, "data/intents.json")