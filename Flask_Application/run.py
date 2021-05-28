"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask
from flask_restful import Api
import mysql.connector
from flask_jwt_extended import JWTManager
from datetime import timedelta
from flask_cors import CORS


#MySQL Connection
db = mysql.connector.connect(
  host="localhost",
  user="root",
  password="",
  database="jwt_test"
)

app = Flask(__name__)
api = Api(app)

#Cors to access from another origin | localhost:3000 in this case
CORS(app)

#Environment Variables
#Ideally stored in .env in production
app.config['JWT_SECRET_KEY'] = 'jwt-secret-string'

app.config['JWT_BLACKLIST_ENABLED'] = True

app.config['JWT_BLACKLIST_TOKEN_CHECKS'] = ['access', 'refresh']

app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=12)



jwt = JWTManager(app)


from Resources_ import dashboard, measurements, produce, resources, sensor,plant_dictionary
from models.RevokedTokensModel import RevokedTokenModel
import Resources_.user_types


#User Registration / Login
api.add_resource(resources.UserRegistration, '/registration')
api.add_resource(resources.UserLogin, '/login')

#User Logout (Revoking JWT Tokens) #TODO #CURRENTLY NOT IN USE CLIENT-SIDE
api.add_resource(resources.UserLogoutAccess, '/logout/access')
api.add_resource(resources.UserLogoutRefresh, '/logout/refresh')

#Automatically getting access tokens with refresh token #TODO #CURRENTLY NOT IN USE CLIENT-SIDE
api.add_resource(resources.TokenRefresh, '/token/refresh')


#Getting all greenhouse information assigned to the user
api.add_resource(dashboard.dashboard, '/greenhouse')

#Specific greenhouse information (Not accessible by other users)
api.add_resource(dashboard.greenhouse, '/greenhouse/<int:greenhouse_id>')

#Greenhouse registration
api.add_resource(dashboard.greenhouseregister, '/greenhouse/register')


#Plant List
api.add_resource(sensor.plant_list, '/greenhouse/<string:greenhouse_id>/plants')


#Sensor Registratin
api.add_resource(sensor.sensor_methods, '/sensor_register')

#Sensor List
api.add_resource(sensor.sensor_list, '/sensor_list')

#Greenhouse Sensor Measurements
api.add_resource(measurements.greenhouse_sensor_entries, '/sensor_gh')

#Plant Sensor Measurements
api.add_resource(measurements.plant_sensor_entries, '/sensor_plant')

#Harvest
api.add_resource(produce.greenhouse_produce, '/greenhouse/<int:greenhouse_id>/harvest')

#Sensor Metrics of greenhouse
api.add_resource(dashboard.greenhouse_metrics, '/greenhouse/<int:greenhouse_id>/metrics')

#Plant Metrics
api.add_resource(dashboard.plant_metrics, '/greenhouse/<string:greenhouse_id>/<string:plant_id>')


api.add_resource(produce.produce_list, '/products')

#Produce Averages
api.add_resource(produce.produce_averages, '/products/<int:produce_id>')

#Admin
api.add_resource(Resources_.user_types.Admin_greenhouses,'/admin')

#Maintenance
api.add_resource(Resources_.user_types.Maintenance,'/maintenance')

api.add_resource(Resources_.plant_dictionary.Plant_dictionary,'/dictionary')


#Populating Sensor Tables
api.add_resource(Resources_.user_types.PopulateCreate, '/Populate')
api.add_resource(Resources_.user_types.PopulateEntries, '/Populate/entries')


@jwt.token_in_blocklist_loader
def check_if_token_revoked(jwt_header, jwt_payload):
    jti = jwt_payload["jti"]
    return RevokedTokenModel.is_jti_blacklisted(jti)
