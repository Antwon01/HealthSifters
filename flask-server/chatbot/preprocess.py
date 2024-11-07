from pymongo import MongoClient
import re
import json 

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

        # generate patterns
        pattern1 = f"What side effects does {name_medicine} have"
        pattern2 = f"What side effects does {name_medicine} cause"
        pattern3 = f"what are the side effects of {name_medicine}"
        pattern4 = f"side effects {name_medicine}"
        pattern5 = f"{name_medicine} side effects"
        pattern6 = f"{name_medicine} effects"
        pattern7 = f"effects of {name_medicine}"
        pattern8 = f"side effects of {name_medicine}"
        patterns = [pattern1, pattern2, pattern3, pattern4, pattern5, pattern6, pattern7, pattern8]

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

        # generate patterns
        pattern1 = f"What ingredients does {name_medicine} have"
        pattern2 = f"Ingredients of {name_medicine}"
        pattern3 = f"what are the ingredients in {name_medicine}"
        pattern4 = f"ingredients {name_medicine}"
        pattern5 = f"{name_medicine} ingredients"
        pattern6 = f"{name_medicine} composition"
        pattern7 = f"composition of {name_medicine}"
        pattern8 = f"what is {name_medicine} composed of"
        patterns = [pattern1, pattern2, pattern3, pattern4, pattern5, pattern6, pattern7, pattern8]

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
        pattern1 = f"What is {name_medicine} used for"
        pattern2 = f"What are uses of {name_medicine}"
        pattern3 = f"What can  I use {name_medicine} for"
        pattern4 = f"What is {name_medicine}"
        pattern5 = f"{name_medicine}"
        pattern6 = f"What conditions does {name_medicine} treat"
        patterns = [pattern1, pattern2, pattern3, pattern4, pattern5, pattern6]

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

        # generate patterns
        pattern1 = f"{name_medicine} reviews"
        pattern2 = f"Reviews of {name_medicine}"
        pattern3 = f"{name_medicine} feedback"
        pattern4 = f"What is customer feedback on {name_medicine}"
        pattern5 = f"What are customer reviews on {name_medicine}"
        pattern6 = f"What do people think of {name_medicine}"
        pattern7 = f"Thoughts on {name_medicine}"
        patterns = [pattern1, pattern2, pattern3, pattern4, pattern5, pattern6, pattern7]

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

# main 

# connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')

# get the database 
db = client['healthsiftDB'] 

# get up collection 
medicine = db['medicine']

# populate intents.json using medicine data 
insert_intents(medicine, "data/intents.json")