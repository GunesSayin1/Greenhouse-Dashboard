"""
In plant_dictionary table, example information for different plant types are stored.
Such as recommended Greenhouse Temperature, Plant Temperature etc.
"""


from flask_restful import Resource
from models.UserModel import UserModel
from run import db

cursor=db.cursor(buffered=True,named_tuple=True)

def plant_dictionary_get_all():

    cursor.execute("""
    SELECT * FROM plant_dictionary
    """)
    k=cursor.fetchall()

    def to_json(x):
        return {
            'plant_name': x.plant_name,
            'Greenhouse_CO2': x.gh_co2,
            'Greenhouse_Temperature': x.gh_temperature,
            'Plant_Temperature': x.plant_temperature,
            'Reoccurring': x.reoccur
        }

    return {'dictionary': list(map(lambda x: to_json(x), k))}



class Plant_dictionary(Resource):
        def get(self):
            """
            :return: All values in table in JSON format
            """
            return plant_dictionary_get_all()
