"""
This module initializes the endpoints' methods and the logic for them. (Greenhouse Related)
Getting list of users greenhouses
Adding new greenhouse
Getting specific greenhouse's information with ID
Harvesting greenhouse
"""

from flask_restful import Resource, reqparse
from flask_jwt_extended import jwt_required,get_jwt_identity
from flask import request
from models.GreenhouseModel import GreenHouse,get_uuid,get_greenhouse_uuid
from models.PlantModel import Plant




parser = reqparse.RequestParser()
parser.add_argument('gh_type', help = 'This field cannot be blank', required = True)
parser.add_argument('gh_sensors', help = 'This field cannot be blank', required = True)
parser.add_argument('number_of_spots', help = 'This field cannot be blank', required = True)
parser.add_argument('plant_type', help = 'This field cannot be blank', required = True)
parser.add_argument('planting_date', help = 'This field cannot be blank', required = True)
parser.add_argument('plant_sensors', help = 'This field cannot be blank', required = True)
parser.add_argument('reoccurring', help = 'This field cannot be blank', required = True)


class dashboard(Resource):
    """
    /greenhouse:
        Available Methods:
                        GET: Returns greenhouses which are assigned to the user.

                        Return:
                                    'greenhouse_id':
                                    'greenhouse_type':
                                    'plant_type':
                                    'planting_date':
    """
    @jwt_required()
    def get(self):
        try:
            uuid = get_uuid(get_jwt_identity())
            gh_list = GreenHouse.get_greenhouses(uuid)
            return gh_list
        except:
            return{"message":"there was an error"}


class greenhouse(Resource):
    """
    /greenhouse/<id>:
        Available Methods:
                        GET: Returns single greenhouse's information in detail, with plant information.
                             Not accessible if JWT payload's username is not assigned to the given greenhouse.
    """
    @jwt_required()
    def get(self,greenhouse_id):
        #Returns all greenhouse information for given greenhouse ID
        data=GreenHouse.get_id_greenhouse(greenhouse_id)
        #If Current UUID = Assigned UUID for the Greenhouse
        if get_uuid(get_jwt_identity()) == get_greenhouse_uuid(greenhouse_id):
            return data
        # If Current UUID != Assigned UUID for the Greenhouse
        elif get_uuid(get_jwt_identity()) != get_greenhouse_uuid(greenhouse_id):
            return {"message":"Acces Denied"}

class greenhouse_metrics(Resource):
    """
    /greenhouse/<id>/metrics:
        Available Methods:
                        GET: Returns single greenhouse's information in detail, with plant information.
                             Not accessible if JWT payload's username is not assigned to the given greenhouse.
    """
    @jwt_required()
    def get(self,greenhouse_id):
        #Returns all greenhouse information for given greenhouse ID
        data=GreenHouse.get_metrics(greenhouse_id)
        #If Current UUID = Assigned UUID for the Greenhouse
        if get_uuid(get_jwt_identity()) == get_greenhouse_uuid(greenhouse_id):
            return data
        # If Current UUID != Assigned UUID for the Greenhouse
        elif get_uuid(get_jwt_identity()) != get_greenhouse_uuid(greenhouse_id):
            return {"message":"Acces Denied"}

class plant_metrics(Resource):
    """
    /greenhouse/<id>/<plant_id>/metrics:
        Available Methods:
                        GET: Returns single greenhouse's information in detail, with plant information.
                             Not accessible if JWT payload's username is not assigned to the given greenhouse.
    """
    @jwt_required()
    def get(self,greenhouse_id,plant_id):
        #Returns all greenhouse information for given greenhouse ID
        data=Plant.get_metrics(greenhouse_id,plant_id)
        #If Current UUID = Assigned UUID for the Greenhouse
        if get_uuid(get_jwt_identity()) == get_greenhouse_uuid(greenhouse_id):
            return data
        # If Current UUID != Assigned UUID for the Greenhouse
        elif get_uuid(get_jwt_identity()) != get_greenhouse_uuid(greenhouse_id):
            return {"message":"Acces Denied"}

class greenhouseregister(Resource):
    """
    /greenhouse/register:
        Available Methods:
                        POST: Registers new greenhouse.
    """
    @jwt_required()
    def post(self):
        data = request.get_json(force=True)
        #Filtering only true values from plant_sensor list, if value is False (Not chosen) it is dropped
        for key,value in list(data["plant_sensors"].items()):
            if value == False:
                data["plant_sensors"].pop(key)

        # Filtering only true values from gh_sensor list, if value is False (Not chosen) it is dropped
        for key,value in list(data["gh_sensors"].items()):
            if value == False:
                data["gh_sensors"].pop(key)

        # Class Instance for Greenhouse
        new_gh = GreenHouse(
            gh_type=data['gh_type'],
            email=get_jwt_identity(),
            gh_sensors=list(data["gh_sensors"].keys()), #Keys are converted to list
            planting_date=data["planting_date"],
            reoccurring=int(data["reoccurring"])
        )

        new_gh.save_to_db()
        new_plant = Plant(
            plant_type=data["plant_type"],
            planting_date=data["planting_date"],
            number_of_spots=int(data["number_of_spots"]),
            reoccurring=int(data["reoccurring"]),
            gh_id=new_gh.last_id,
            sensors=list(data["plant_sensors"].keys()) #Keys are converted to list
        )
        new_plant.save_to_db()

        #new_gh.save_to_db()
        return{
            'message': '{name} Grenhouse containing {plant_name} {plant_amount} is created'.format(name=data['gh_type'],plant_name=data["plant_type"],plant_amount=data["number_of_spots"])
        }
