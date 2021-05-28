
from flask_jwt_extended import jwt_required, get_jwt_identity


import faker
from faker import Faker

fake = Faker()

from flask_restful import Resource

from models.GreenhouseModel import get_uuid
from run import db

cursor=db.cursor(buffered=True,named_tuple=True)

class Admin:
    """
    Admin Model, Has access to all greenhouses, user information
    """
    @classmethod
    def find_if_admin(self,identity):
        """

        :param identity: JWT_Identity
        :return: True if user_type is admin ,else False
        """

        cursor.execute("""
        SELECT user_type FROM user_test WHERE email=%s
        """,[identity])

        k=cursor.fetchone()
        print(k)
        if k.user_type == "admin":
            return True
        else:
            return False

    @classmethod
    def all_greenhouses(self):
        """

        :return:
                Greenhouse and User information of all users
        """
        cursor.execute("""
SELECT DISTINCT gh_test.greenhouse_id,gh_test.greenhouse_type,gh_test.user_id,gh_test.active,gh_test.reoccurring,gh_test.planting_date,user_test.name,user_test.email,user_test.phone_number,user_test.address,user_test.gender,user_test.sub_newsletter,user_test.experience,plant_table.plant_type,plant_table.plant_sensor_amount
                FROM ((gh_test
                INNER JOIN user_test ON gh_test.user_id = user_test.user_id)
                INNER JOIN plant_table ON gh_test.greenhouse_id = plant_table.greenhouse_id)
                group by gh_test.greenhouse_id;


        """)
        k = cursor.fetchall()
        def to_json(x):
            return {
                'user_name':x.name,
                'user_email':x.email,
                'phone_number':x.phone_number,
                'address':x.address,
                'gender':x.gender,
                'newsletter':x.sub_newsletter,
                'experience':x.experience,
                'greenhouse_id':x.greenhouse_id,
                'greenhouse_type':x.greenhouse_type,
                'planting_date':str(x.planting_date),
                'plant_type':x.plant_type,
                'plant_sensor_amount':x.plant_sensor_amount,
            }

        return {'Info': list(map(lambda x: to_json(x), k))}

class Maintenance_User:
    @classmethod
    def find_if_maintenance(self,identity):
        """

        :param identity: JWT_Identity
        :return: Returns True if User_Type is maintenance , else False
        """
        cursor.execute("""
        SELECT user_type FROM user_test WHERE email=%s
        """,[identity])

        k=cursor.fetchone()
        if "maintenance" in k.user_type:
            return True
        else:
           return False
    @classmethod
    def find_maintenance_brand(self,identity):
        """
        :param identity: JWT_Identity
        :return:
                Finds maintenance person's company from user_model i.e
                PHL-maintenance, user_type can access to all user data which has
                PHL-xxxxxx sensor model in sensor_table
        """
        try:
            k=[]
            cursor.execute("""
            SELECT user_type FROM user_test WHERE email=%s
            """,[identity])
            brand=cursor.fetchone()
            brand=str(brand.user_type[:3])
            cursor.execute("""
            SELECT user_id FROM sensor_table
            WHERE model LIKE %s
            GROUP by user_id 
            """,("%" + brand + "%",))
            users=cursor.fetchall()
            for n in users:
                cursor.execute("""
                    SELECT DISTINCT gh_test.greenhouse_id,greenhouse_type,name,email,phone_number,address,experience,model
                    FROM ((gh_test
                    INNER JOIN user_test ON gh_test.user_id = user_test.user_id)
                    INNER JOIN sensor_table ON gh_test.user_id = user_test.user_id)
                    WHERE user_test.user_id=%s 
                    GROUP BY gh_test.greenhouse_id
                """,[n.user_id])
                l=cursor.fetchone()
                k.append(l)
            def to_json(x):
                return {
                    'greenhouse_id':x.greenhouse_id,
                    'greenhouse_type':x.greenhouse_type,
                    'name':x.name,
                    'email':x.email,
                    'phone_number':x.phone_number,
                    'address':x.address,
                    'experience':x.experience
                }

            return {'Maintenance': list(map(lambda x: to_json(x), k))}
        except AttributeError:
            return {"Unauthorized"}


class Admin_greenhouses(Resource):


        @jwt_required()
        def get(self):

            if Admin.find_if_admin(get_jwt_identity()):
                return Admin.all_greenhouses()
            else:
                return{"message":"Unauthorized"}


class Maintenance(Resource):
    @jwt_required()
    def get(self):
        if Maintenance_User.find_if_maintenance(get_jwt_identity()):
            return Maintenance_User.find_maintenance_brand(get_jwt_identity())
        else:
            return {"message": "Unauthorized"}


class Populator:
    @classmethod
    def populate(self,uuid):
        cursor.execute("SELECT greenhouse_id FROM gh_test ORDER BY greenhouse_id DESC LIMIT 1;")
        k=cursor.fetchone()
        model="PHL-BME280"
        import random
        for n in range(50):
            sensor_type = random.randint(0,1)
            cursor.execute("""
            INSERT INTO sensor_table (greenhouse_id, sensor_type, model, user_id) 
                                   VALUES 
                                   (%s, %s, %s, %s) 
                                   
                                   """
            ,[k.greenhouse_id,sensor_type,model,uuid])
            db.commit()

    @classmethod
    def populate_entries(cls):
        cursor.execute("SELECT greenhouse_id FROM gh_test ORDER BY greenhouse_id DESC LIMIT 1;")
        k=cursor.fetchone()
        import random
        for n in range(1000):
            sensor_id = random.randint(0,49)
            plant_id = random.randint(0,100)
            sensor_status = random.randint(0,1)
            measurement_names=["Temperature","Humidity","Co2","Ammonia","Light","O2"]
            measurement_name = random.choice(measurement_names)
            measurement = (round(random.uniform(30, 70), 2))
            measurement_date =fake.date_between(start_date='-30d', end_date='now').strftime('%Y-%m-%d %H:%M:%S')
            maintenance_date = "2022-05-28"
            remaining_days_to_maintenance = "365"
            life_expectancy = "2022-05-28"
            remaining_life = "365"
            sensor_type = random.randint(0,1)
            cursor.execute("""
            
            INSERT INTO sensor_entries (greenhouse_id, sensor_id, plant_id, sensor_status,
            measurement_name,measurement,measurement_date,maintenance_date,remaining_days_to_maintenance,
            life_expectancy,remaining_life,sensor_type
            ) 
                                   VALUES 
                                   (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s) 

                                   """
                           , [k.greenhouse_id, sensor_id, plant_id, sensor_status,measurement_name,
                              measurement,measurement_date,maintenance_date,remaining_days_to_maintenance,
                              life_expectancy,remaining_life,sensor_type])
            db.commit()

class PopulateCreate(Resource):
    @jwt_required()
    def get(self):
        Populator.populate(get_uuid(get_jwt_identity()))

class PopulateEntries(Resource):
    @jwt_required()
    def get(self):
        Populator.populate_entries()