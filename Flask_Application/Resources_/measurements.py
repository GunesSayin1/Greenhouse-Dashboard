from flask_restful import Resource, reqparse
from flask import request
from models.PlantModel import Plant
from models.GreenhouseModel import get_uuid,get_greenhouse_uuid
from models.UserModel import UserModel
from models.SensorModel import Sensor
from models.GreenhouseEntriesModel import Greenhouse_Entries
from models.PlantEntriesModel import Plant_Entries


class greenhouse_sensor_entries(Resource):
    """
    Inserting measurements of the sensor to the table. JWT is not required, microcontroller can post login credentials directly.
                                                       Required Fields:
                                                                        email:
                                                                        password:
                                                                        gh_id:
                                                                        sensor_id:
                                                                        sensor_status:
                                                                        measurement_name:
                                                                        measurement:
                                                       Optional Fields:
                                                                        plant_id:
                                                                        maintenance_date:
                                                                        life_expectancy:
    """
    def post(self):

        data = request.get_json(force=True)

        current_user = UserModel.find_by_username(data['email'])

        if not current_user:
            return {'message': 'User {} doesn\'t exist'.format(data['email'])}

        if "gh_id" not in data.keys():
            return {'message': 'Greenhouse ID is not stated. List of sensors can be gathered with GET request at /greenhouse'}

        if "sensor_id" not in data.keys():
            return {'message': 'Sensor_id is not stated. List of sensors can be gathered with GET request at /sensor_list'}

        if "measurement_name" not in data.keys():
            return {'message': 'Measurement name is not given'}

        if "measurement" not in data.keys():
            return {'message': 'Measurement is not given'}

        if int(data["sensor_id"]) not in Sensor.get_sensor_id(data["gh_id"]):
            return {"message":"Sensor_id not existing or doesn't belong to this greenhouse"}
        if UserModel.verify_hash(data['password'], current_user.password) and get_uuid(data["email"]) == get_greenhouse_uuid(data["gh_id"]):
            if "maintenance_date" and "life_expectancy" in data.keys():
                new_measurement=Greenhouse_Entries(
                    sensor_id=data["sensor_id"],
                    gh_id=data["gh_id"],
                    sensor_status=int(data["sensor_status"]),
                    maintenance_date=data["maintenance_date"],
                    measurement_name=data["measurement_name"],
                    measurement=data["measurement"],
                    sensor_type=int(Sensor.get_sensor_type_with_id(data["sensor_id"])),
                    life_expectancy=data["life_expectancy"])
                print(new_measurement)
                new_measurement.save_to_db()
            elif "maintenance_date" and "life_expectancy" not in data.keys():
                new_measurement=Greenhouse_Entries(
                    sensor_id=data["sensor_id"],
                    gh_id=data["gh_id"],
                    sensor_status=int(data["sensor_status"]),
                    measurement_name=data["measurement_name"],
                    measurement=data["measurement"],
                    sensor_type=int(Sensor.get_sensor_type_with_id(data["sensor_id"])))
                print(new_measurement)
                new_measurement.save_to_db()
        else:
            return {'message': 'Wrong credentials'}

class plant_sensor_entries(Resource):
    """
    Inserting Plant measurements of the sensor to the table. JWT is not required, microcontroller can post login credentials directly.
                                                       Required Fields:
                                                                        email:
                                                                        password:
                                                                        gh_id:
                                                                        plant_id:
                                                                        sensor_id:
                                                                        sensor_status:
                                                                        measurement_name:
                                                                        measurement:
                                                       Optional Fields:
                                                                        maintenance_date:
                                                                        life_expectancy:
    """
    def post(self):

        data = request.get_json(force=True)

        current_user = UserModel.find_by_username(data['email'])

        if not current_user:
            return {'message': 'User {} doesn\'t exist'.format(data['email'])}

        if "gh_id" not in data.keys():
            return {'message': 'Greenhouse ID is not stated. List of greenhouses can be gathered with GET request at /greenhouse'}

        if "plant_id" not in data.keys():
            return {'message': 'Plant ID is not stated. List of plants can be gathered with GET request at /plant_list'}

        if "sensor_id" not in data.keys():
            return {'message': 'Sensor_id is not stated. List of sensors can be gathered with GET request at /sensor_list'}

        if "measurement_name" not in data.keys():
            return {'message': 'Measurement name is not given'}

        if "measurement" not in data.keys():
            return {'message': 'Measurement is not given'}

        if int(data["sensor_id"]) not in Sensor.get_sensor_id(data["gh_id"]):
            return {"message":"Sensor_id not existing or doesn't belong to this greenhouse"}

        if int(data["plant_id"]) not in Plant.get_plant_id(data["gh_id"]):
            return {"message": "Plant_id not existing or doesn't belong to this greenhouse"}

        print(Plant.get_plant_id(data["gh_id"]))
        if UserModel.verify_hash(data['password'], current_user.password) and get_uuid(data["email"]) == get_greenhouse_uuid(data["gh_id"]):
            if "maintenance_date" and "life_expectancy" in data.keys():
                new_measurement=Plant_Entries(
                    sensor_id=data["sensor_id"],
                    plant_id=data["plant_id"],
                    gh_id=data["gh_id"],
                    sensor_status=int(data["sensor_status"]),
                    maintenance_date=data["maintenance_date"],
                    measurement_name=data["measurement_name"],
                    measurement=data["measurement"],
                    sensor_type=int(Sensor.get_sensor_type_with_id(data["sensor_id"])),
                    life_expectancy=data["life_expectancy"])
                print(new_measurement)
                new_measurement.save_to_db()
            elif "maintenance_date" and "life_expectancy" not in data.keys():
                new_measurement=Greenhouse_Entries(
                    sensor_id=data["sensor_id"],
                    gh_id=data["gh_id"],
                    plant_id=data["plant_id"],
                    sensor_status=int(data["sensor_status"]),
                    measurement_name=data["measurement_name"],
                    measurement=data["measurement"],
                    sensor_type=int(Sensor.get_sensor_type_with_id(data["sensor_id"])))
                print(new_measurement)
                new_measurement.save_to_db()
        else:
            return {'message': 'Wrong credentials'}