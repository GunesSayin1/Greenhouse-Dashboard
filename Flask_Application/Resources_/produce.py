

from flask_restful import Resource, reqparse
from flask_jwt_extended import jwt_required,get_jwt_identity
from models.GreenhouseModel import GreenHouse,get_uuid,get_greenhouse_uuid
from models.ProduceModel import Produce


parser = reqparse.RequestParser()
parser.add_argument('produce_type', help = 'This field cannot be blank', required = True)
parser.add_argument('produce_amount', help = 'This field cannot be blank', required = True)
parser.add_argument('harvesting_date', help = 'This field cannot be blank', required = True)
parser.add_argument('planting_date', help = 'This field cannot be blank', required = False,)


class greenhouse_produce(Resource):
    """
    /greenhouse/3/harvest:
        Available Methods:
                        POST: Registers new Produce
                              Creates given amount of produces assigned to the greenhouse.
    """
    @jwt_required()
    def post(self,greenhouse_id):
        if get_uuid(get_jwt_identity()) != get_greenhouse_uuid(greenhouse_id):
            return {"message":"Your not authorized to access this greenhouse"}
        activation=0
        data = parser.parse_args()
        print(data)
        reoccur=GreenHouse.get_reoccurring(greenhouse_id)[0][0]
        if reoccur == 0:
            activation = 0
            GreenHouse.harvest(greenhouse_id, activation)
            produce=Produce(
                gh_id=greenhouse_id,
                produce_type=data["produce_type"],
                produce_amount=data["produce_amount"],
                harvesting_date=data["harvesting_date"],
                email=(get_jwt_identity()),
            )
            produce.save_to_db()
        if reoccur == 1:
            activation = 1
            GreenHouse.harvest(greenhouse_id, activation, data["planting_date"])
        #Produces has been registered to the produce table
            produce=Produce(
                gh_id=greenhouse_id,
                produce_type=data["produce_type"],
                produce_amount=data["produce_amount"],
                harvesting_date=str(data["harvesting_date"]),
                email=(get_jwt_identity()),
                planting_date=str(data["planting_date"])
            )
            produce.save_to_db()
        return {"message":"{pamount} of {pname} has been registered.".format(pamount=data["produce_amount"],pname=data["produce_type"])}


class produce_list(Resource):
    """
    /produce:
        Available Methods:
                        GET: Return Produces List
    """
    @jwt_required()
    def get(self):
        uuid = get_uuid(get_jwt_identity())
        gh_list = Produce.get_produces(uuid)
        return gh_list

class produce_averages(Resource):
    """
    /produce/metrics:
        Available Methods:
                        GET: Returns Average Produce Measurements
    """
    @jwt_required()
    def get(self,produce_id):
        gh_list = Produce.get_averages(produce_id)
        return gh_list