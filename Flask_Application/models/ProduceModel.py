from run import db
from datetime import datetime
from models.SensorModel import Sensor
from models.GreenhouseModel import get_uuid
cursor = db.cursor(buffered=True, named_tuple=True)


class Produce:
    def __init__(self, email,gh_id, produce_amount, produce_type, harvesting_date,planting_date=None):
        """
        Products
        :param email:
        :param gh_id:
        :param produce_amount:
        :param produce_type:
        :param harvesting_date:
        :param planting_date:
        """
        self.gh_id = gh_id
        self.produce_amount = produce_amount
        self.produce_type = produce_type
        self.harvesting_date = harvesting_date
        self.email=email
        self.planting_date=planting_date

    def save_to_db(self):
        """
        Save parameters to table
        :return:
        """
        sql = "INSERT INTO produce_table (user_id,greenhouse_id,produce_amount,produce_type,harvesting_date,planting_date)" \
              " VALUES(%s,%s,%s,%s,%s,%s)"
        values = (get_uuid(self.email),self.gh_id, self.produce_amount, self.produce_type, self.harvesting_date,self.planting_date)
        cursor = db.cursor()
        cursor.execute(sql, values)
        db.commit()
    @classmethod
    def get_produces(self,uuid):
        """

        :param uuid:
        :return: Get Products for given user_id
        """
        # Gets greenhouse values of the user also unique plant_type and planting date
        cursor = db.cursor(buffered=True, named_tuple=True)
        cursor.execute("SELECT produce_id,greenhouse_id,produce_amount,produce_type,harvesting_date FROM produce_table WHERE user_id=%s;", [uuid])
        k = cursor.fetchall()

        def to_json(x):

            return {
                'produce_id':x.produce_id,
                'greenhouse_id': x.greenhouse_id,
                'produce_amount': x.produce_amount,
                'produce_type': x.produce_type,
                'harvesting_date': str(x.harvesting_date)
            }

        return {'YourProducts': list((map(lambda x: to_json(x),k)))}


    @classmethod
    def get_averages(cls,produce_id):
        """
        Helper Function to calculate average measurements between planting date and harvesting date for plant
        Helps /models/SensorModel/get_average_gh
        :param produce_id:
        :return: Arguments for another function. Arguments are: Greenhouse ID
                                                                Planting Date
                                                                Harvesting Date
                                                                Produce_ID

        """
        try:
            cursor.execute("SELECT planting_date,harvesting_date,greenhouse_id FROM produce_table WHERE produce_id = %s",[produce_id])
            k=cursor.fetchone()

            starting_date = datetime.strftime(k.planting_date, "%Y%m%d")
            ending_date = datetime.strftime(k.harvesting_date, "%Y%m%d")
            return Sensor.get_average_gh(k.greenhouse_id,starting_date,ending_date,produce_id)
        except AttributeError:
            return {"Message":"This product doesn't exist"}


