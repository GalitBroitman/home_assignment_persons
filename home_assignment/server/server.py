from flask import Flask, jsonify, request
import csv
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)


file_path = 'MOCK_DATA.csv'


def fetch_persons_info():
    persons_info = []
    with open(file_path, 'r') as file:
        reader = csv.reader(file)
        keys =[]
        for row in reader:
            if(len(keys) == 0):
                keys = row
                continue
            flight = {keys[i]: row[i] for i in range(len(keys))}
            persons_info.append(flight)
    return persons_info


def update_persons_info(new_persons):
    df = pd.DataFrame(new_persons)
    df.to_csv(file_path, index=False, mode='w')



def delete_row(id):
    rows = []
    header = []
    deleted = False
    with open(file_path, 'r') as file:
        reader = csv.reader(file)
        for row in reader:
            if(len(header) == 0):
                header = row
                continue
            if row[0] != id:
                rows.append(row)
            else:
                deleted = True

    with open(file_path, 'w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(header)
        writer.writerows(rows)
    
    return deleted



@app.route('/persons', methods=['GET'])
def get_persons():
    persons_info = fetch_persons_info()
    return jsonify(persons_info)


@app.route("/persons", methods=["POST"])
def add_persons():
    persons_data = request.get_json()
    update_persons_info(persons_data)
    return "Person added", 201

@app.route("/persons/<id>", methods=["DELETE"])
def delete_item(id):
    item_deleted = delete_row(id)

    if item_deleted:
        return "Item with id {} was successfully deleted.".format(id), 200
    else:
        return "Item with id {} was not found.".format(id), 404

if __name__ == '__main__':
    app.run()