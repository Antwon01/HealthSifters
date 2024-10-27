from pymongo import MongoClient
import re
import json 

# iterates over the medicine collections and prints json of each medicine document 
def print_medicines(medicine_collection):
    for medicine_entry in medicine_collection.find():
        print(medicine_entry)

# add use of each medicine to intents.json
def add_uses_to_intents(medicine_collection, intents_path):
    # iterate over medicines
    for medicine_entry in medicine_collection.find():
        # get medicine name
        name_medicine = medicine_entry['Medicine Name']

        # get medicine use
        use_medicine = medicine_entry['Uses']

        # process medicine uses 
        # add XX_DELIMETER_XX between different uses 
        uses = re.sub("([a-z])([A-Z])", r"\1XX_DELIMETER_XX\2", use_medicine)
        uses_list = uses.split("XX_DELIMETER_XX")

        # create string of uses  
        num_uses = len(uses_list)
        str_uses = ""
        for i in range(0, num_uses):
            if num_uses == 1:
                str_uses += uses_list[i]
            elif i == num_uses - 1:
                str_uses += " and " + uses_list[i]
            else:
                str_uses += uses_list[i] + ","

        # generate response(s)
        response1 = f"{name_medicine} is used for {str_uses}" # TODO add list of uses here 
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

# add all intents to intents.json
def insert_intents(medicine_collection, intents_path):
    # insert uses intents 
    add_uses_to_intents(medicine_collection, intents_path)

# main 

# connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')

# get the database 
db = client['healthsiftDB'] # database name

# get up collection 
medicine = db['medicine']

add_uses_to_intents(medicine, "data/intents.json")

# TODO: in the dataset, the 'Uses' columns is not nicely formatted. May need to manually go through and reformat it to give a nice delimeter between various uses 
# TODO: insert_intents() has been used/called yet. Once all functions are ready, reset intents.json and call this function instead of each individual one 
