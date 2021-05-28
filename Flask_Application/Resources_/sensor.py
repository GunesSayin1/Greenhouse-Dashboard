"""Requests from microcontroller has to be in JSON format"""
from flask_restful import Resource, reqparse
from flask import request
from models.UserModel import UserModel
from models.SensorModel import Sensor
from models.PlantModel import Plant
from models.GreenhouseModel import get_uuid,get_greenhouse_uuid

parser = reqparse.RequestParser()
parser.add_argument('email', help = 'This field cannot be blank', required = True)
parser.add_argument('password', help = 'This field cannot be blank', required = True)
parser.add_argument('gh_id', help = 'This field cannot be blank', required = False)


class plant_list(Resource):
    """
    Returns list of plants for every greenhouse of this user.
                                                            Required Fields:
                                                                        email:
                                                                        password:
    """
    def get(self,greenhouse_id):
        data = parser.parse_args()
        current_user = UserModel.find_by_username(data['email'])

        if not current_user:
            return {'message': 'User {} doesn\'t exist'.format(data['email'])}

        if get_uuid(data["email"]) == get_greenhouse_uuid(data["gh_id"]):
            try:
                return Plant.plant_return_all(greenhouse_id)
            except:
                return{"message":"There was an error getting list of plants"}
        else:
            return {'message': 'Wrong credentials'}

class sensor_methods(Resource):
    """
    Registration of the sensor. JWT is not required, microcontroller can post login credentials directly.
                                                            (If login is unsuccesful method doesn't take place)
                                                            Required Fields:
                                                                        email:
                                                                        password:
                                                                        gh_id:
                                                                        model: Model of sensor,
                                                                        sensor_type:0 for greenhouse 1 for plant
    """
    def post(self):
        data = request.get_json(force=True)
        current_user = UserModel.find_by_username(data['email'])
        if not current_user:
            return {'message': 'User {} doesn\'t exist'.format(data['email'])}
        if "gh_id" not in data.keys():
            return {'message': 'Greenhouse ID is not given'}


        if UserModel.verify_hash(data['password'], current_user.password) and get_uuid(data["email"]) == get_greenhouse_uuid(data["gh_id"]):
            try:
                new_sensor=Sensor(
                    email=data["email"],
                    type=int(data["sensor_type"]),
                    gh_id=data["gh_id"],
                    model=data["model"])
                new_sensor.save_to_db()
                return{"message":"{model} has been registered with sensor_id {sensor_id}".format(model=data["model"],sensor_id=new_sensor.last_id)}
            except:
                return{"message":"There was an error registering sensor"}
        else:
            return {'message': 'Wrong credentials'}



class sensor_list(Resource):
    """
    Returns list of sensors for every greenhouse of this user.
                                                            Required Fields:
                                                                        email:
                                                                        password:
    """
    def get(self):
        data = parser.parse_args()
        current_user = UserModel.find_by_username(data['email'])

        if not current_user:
            return {'message': 'User {} doesn\'t exist'.format(data['email'])}

        if UserModel.verify_hash(data['password'], current_user.password):
            try:
                sensors_list = Sensor.sensor_return_all(get_uuid(data["email"]))
                return sensors_list
            except:
                return{"message":"There was an error getting list of sensors"}
        else:
            return {'message': 'Wrong credentials'}

