from run import db
from models.PlantModel import Plant
cursor = db.cursor(buffered=True, named_tuple=True)

def get_uuid(email):
    """Returns UUID of the user from database
            Example:
                    Argument: gunes
                    Return: 540c96ea-b8f0-11eb-93a4-2cf05d737518
    """
    try:
        cursor = db.cursor(buffered=True)
        cursor.execute("SELECT user_id FROM user_test WHERE email=%s", [email])
        user_uuid = cursor.fetchone()
        return user_uuid[0]
    except:
        return {"message": "There was an error getting UUID"}


def get_greenhouse_uuid(gh_id):
    """Returns UUID of the user from database
            Example:
                    Argument: 1
                    Return: 540c96ea-b8f0-11eb-93a4-2cf05d737518
    """
    try:
        cursor = db.cursor(buffered=True)
        cursor.execute("SELECT user_id FROM gh_test WHERE greenhouse_id=%s", [gh_id])
        user_uuid = cursor.fetchone()
        return user_uuid[0]
    except:
        return {"message": "There was an error getting UUID"}


class GreenHouse:
    """
    This class handles registration of the greenhouse and finding greenhouse from given ID.
    """

    def __init__(self, gh_type, email, planting_date, gh_sensors, reoccurring):
        self.greenhouse_type = gh_type
        self.email = email
        self.date = planting_date
        self.sensors = gh_sensors
        self.reoccurring = reoccurring

    def save_to_db(self):
        """
        Save parameters to table
        :return:
        """
        sql = "INSERT INTO gh_test (user_id,greenhouse_type,active,reoccurring,planting_date) VALUES(%s,%s,%s,%s,%s)"
        uuid = get_uuid(self.email)
        values = (uuid, self.greenhouse_type, 1, self.reoccurring,self.date)
        cursor.execute(sql, values)
        db.commit()

        self.last_id = cursor.lastrowid

    @classmethod
    def get_greenhouses(self, uuid):
        """

        :param uuid: User_ID in UUID format, acquired from JWT_Identity in routine
        :return: All greenhouse values, Plant Type in Greenhouse, Planting Date
        """

        cursor.execute("""
                        SELECT DISTINCT gh_test.greenhouse_id,greenhouse_type,plant_type,gh_test.planting_date
                FROM ((gh_test
                INNER JOIN plant_table ON gh_test.greenhouse_id = plant_table.greenhouse_id))
                WHERE gh_test.user_id=%s
                GROUP BY gh_test.greenhouse_id
                """,[uuid])
        l=cursor.fetchall()
        def to_json(x):
            return {
                'greenhouse_id': x.greenhouse_id,
                'greenhouse_type': x.greenhouse_type,
                'plant_type': x.plant_type,
                'planting_date': str(x.planting_date)
            }
        return {'YourGreenhouses': list(map(lambda x: to_json(x), l))}


    @classmethod
    def get_reoccurring(cls, id):
        cursor = db.cursor(buffered=True)
        cursor.execute("SELECT reoccurring FROM gh_test WHERE greenhouse_id=%s", [id])
        data = cursor.fetchall()
        cursor.close()
        return data

    @classmethod
    def harvest(cls, id, active,planting_date=None):
        from datetime import datetime
        planting_date = datetime.strptime(planting_date, "%Y-%m-%d")

        cursor = db.cursor()
        cursor.execute("UPDATE gh_test SET active =%s WHERE greenhouse_id=%s;", [active, id])
        if active == 0:
            cursor.execute("UPDATE plant_table SET active =%s WHERE greenhouse_id=%s;",
                           [active, id])
        if active == 1:
            cursor.execute("UPDATE plant_table SET active =%s,planting_date=%s WHERE greenhouse_id=%s;",
                           [active,planting_date, id])
        db.commit()
        return
    @classmethod
    def get_recent_measurements(cls,id):
        """
        Helper Function
        :param id: greenhouse_id
        :return: greenhouse id,measurement,measurement_name and measurement date
                 (Last measurement for each different type of measurement)
        """
        cursor.execute("""
        SELECT s1.greenhouse_id,s1.measurement_name,s1.measurement,s1.measurement_date
        FROM sensor_entries s1
        JOIN
        (
          SELECT greenhouse_id, measurement_name,max(measurement_date) AS mts
          FROM sensor_entries
          WHERE sensor_type = 0 AND greenhouse_id = %s
          GROUP BY measurement_name
        ) s2
            ON s2.greenhouse_id = s1.greenhouse_id AND s1.measurement_date = s2.mts
            GROUP BY measurement_name""", [id])
        return cursor.fetchall()


    @classmethod
    def get_id_greenhouse(self, id):
        """ Last measurements from sensor_entries where greenhouse_id is matching
                                                                  sensor_type is 0
                                                                  returns:
                                                                  measurement name
                                                                  measurement
                                                                  measurement date
                                                                  """
        try:
            cursor = db.cursor(buffered=True, named_tuple=True)
            cursor.execute("SELECT greenhouse_type FROM gh_test WHERE greenhouse_id=%s", [id])
            k = cursor.fetchone()[0]
        except TypeError:
            return {"Message":"This greenhouse doesn't exist"}
        cursor.execute("SELECT COUNT( DISTINCT plant_id) as number_of_plants FROM plant_table WHERE greenhouse_id=%s;",[id])

        number_of_plants=cursor.fetchone()[0]
        greenhouse_measurements = GreenHouse.get_recent_measurements(id)
        plant_measurements = Plant.get_recent_plant_measurements(id)
        def to_json(z):
            return {
                'measurement_name': z.measurement_name,
                'measurement': z.measurement,
                'measurement_date': str(z.measurement_date)
            }
        def plants_to_json(x):
            return{
                'plant_id':x.plant_id,
                'measurement_name':x.measurement_name,
                'measurement':x.measurement,
                'measurement_date':str(x.measurement_date)
            }
        x=dict(type=k,number_of_plants=number_of_plants, ghmeasurements=list(map(lambda z: to_json(z), greenhouse_measurements)), plants=list(map(lambda z: plants_to_json(z),plant_measurements)))
        return dict(type=k,number_of_plants=number_of_plants, ghmeasurements=list(map(lambda z: to_json(z), greenhouse_measurements)), plants=list(map(lambda z: plants_to_json(z),plant_measurements)))

    @classmethod
    def get_metrics(cls, greenhouse_id):
        """
        :param greenhouse_id:
        :param plant_id:
        :return: All measurements
        """
        cursor.execute("""
          SELECT greenhouse_id, plant_id, measurement_name,measurement,measurement_date
          FROM sensor_entries
          WHERE sensor_type = 1 AND greenhouse_id = %s AND sensor_status =1
          ORDER BY measurement_date ,measurement_name""", [greenhouse_id])
        k = cursor.fetchall()
        def to_json(z):
            return {
                'measurement_name': z.measurement_name,
                'measurement': z.measurement,
                'measurement_date': str(z.measurement_date)
            }

        return dict(measurements=list(map(lambda z: to_json(z), k)))