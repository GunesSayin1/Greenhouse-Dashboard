from run import db

cursor = db.cursor(buffered=True, named_tuple=True)
from models.GreenhouseModel import get_uuid
class Sensor:
    def __init__(self, type, gh_id, model, email):
        """
        Sensor Registration
        :param type:
        :param gh_id:
        :param model:
        :param email:
        """
        self.type = type
        self.gh_id = gh_id
        self.model = model
        self.email = email

    def save_to_db(self):
        """
        Adds parameters to table
        :return:
        """
        sql = "INSERT INTO sensor_table (user_id,greenhouse_id,sensor_type,model)" \
              " VALUES(%s,%s,%s,%s)"
        values = (get_uuid(self.email), self.gh_id, self.type, self.model)
        cursor = db.cursor()
        cursor.execute(sql, values)
        db.commit()
        self.last_id = cursor.lastrowid

    @classmethod
    def get_sensor_id(self, greenhouse_id):
        """
        :param greenhouse_id:
        :return: Sensor ids for given greenhouse_id
        """
        cursor.execute("SELECT sensor_id FROM sensor_Table WHERE greenhouse_id=%s", [greenhouse_id])
        existing_sensor = [int(i[0]) for i in cursor.fetchall()]
        return existing_sensor

    @classmethod
    def sensor_return_all(self, uuid):
        """
        Returns sensor information for given user_id along with:
                                                                Greenhouse_id
                                                                sensor_id
                                                                sensor_model
                                                                Type of Sensor (Plant or Greenhouse)
        :param uuid:
        :return:
        """
        cursor.execute("SELECT * FROM sensor_table WHERE user_id=%s", [uuid])
        k = cursor.fetchall()

        def to_json(x):
            global sensor_type
            if x.sensor_type == 1:
                sensor_type = "Plant (1)"
            elif x.sensor_type == 0:
                sensor_type = "Greenhouse (0)"
            return {
                'greenhouse_id': x.greenhouse_id,
                'sensor_id': x.sensor_id,
                'sensor_model': x.model,
                'Type of sensor': sensor_type
            }

        return {'Sensors in your account:': list(map(lambda x: to_json(x), k))}

    @classmethod
    def get_sensor_type_with_id(cls, id):
        """
        :param id:
        :return: Sensor Type for given sensor ID
        """
        cursor.execute("SELECT sensor_type FROM sensor_table WHERE sensor_id=%s", [id])
        k = cursor.fetchone()
        return k.sensor_type



    @classmethod
    def length_calculator(cls,data,measurement_name):
    #Helper Function calculates length of given string in given data
      return sum([1 for d in data if str(measurement_name) in d["measurement_name"]])

    @classmethod
    def measurement_summation(cls,id,starting,ending,measurement_name):
        """
        Sums all measurements for given:
                                        greenhouse_id
                                        measurement_name
                                        planting_date
                                        harvesting_date
        :param id:
        :param starting:
        :param ending:
        :param measurement_name:
        :return:
        """
        cursor.execute("""          SELECT sum(measurement) as total
                                      FROM sensor_entries
                                        WHERE measurement_date>= %s
                                        AND measurement_date <  %s
                                        AND sensor_type = 0
                                        AND greenhouse_id = %s
                                        AND sensor_status =1
                                        AND measurement_name=%s;""",[starting,ending,id,measurement_name])
        return cursor.fetchone().total

    @classmethod
    def get_average_gh(cls,id,starting,ending,produce_id):
        """
        Main function for calculating average measurements for product.
        :param id:
        :param starting:
        :param ending:
        :param produce_id:
        """
        cursor = db.cursor(buffered=True, dictionary=True)
        #
        cursor.execute("""          SELECT measurement_name,measurement
                                    FROM sensor_entries
                                    WHERE measurement_date>= %s
                                    AND measurement_date <  %s
                                    AND sensor_type = 0
                                    AND greenhouse_id = %s
                                    AND sensor_status =1;""",[starting,ending,id])
        k=cursor.fetchall()
        cursor.execute("""          SELECT measurement_name,measurement
                                    FROM sensor_entries
                                    WHERE measurement_date>= %s
                                    AND measurement_date <  %s
                                    AND sensor_type = 1
                                    AND greenhouse_id = %s
                                    AND sensor_status =1;""",[starting,ending,id])
        plants=cursor.fetchall()
        cursor.execute("""          SELECT measurement_name,measurement
                                    FROM sensor_entries
                                    WHERE measurement_date>= %s
                                    AND measurement_date <  %s
                                    AND sensor_type = 1
                                    AND greenhouse_id = %s
                                    AND sensor_status =1
                                    GROUP BY measurement_name;""",[starting,ending,id])
        plant_names=cursor.fetchall()
        cursor.execute("""          SELECT measurement_name,measurement
                                    FROM sensor_entries
                                    WHERE measurement_date>= %s
                                    AND measurement_date <  %s
                                    AND sensor_type = 0
                                    AND greenhouse_id = %s
                                    AND sensor_status =1
                                    GROUP BY measurement_name;""",[starting,ending,id])
        gh_names=cursor.fetchall()
        l=[]
        t=[]
        for i in [a_dict["measurement_name"] for a_dict in plant_names]:
            print(i)
            t.append(Sensor.measurement_summation(id, starting, ending, i) / Sensor.length_calculator(plants, measurement_name=i))
        for n in [a_dict["measurement_name"] for a_dict in gh_names]:
            l.append(Sensor.measurement_summation(id, starting, ending, n) / Sensor.length_calculator(k, measurement_name=n))
        a=list(zip([a_dict["measurement_name"] for a_dict in gh_names], l))
        b=list(zip([b_dict["measurement_name"] for b_dict in plant_names], t))
        keys=["measurement_name","measurement"]
        print(a)
        def to_json(x):
                return {
                    'measurement_name': x[n][n],
                    'measurement': x[n+1][n+1],
                }




        measurements=[item for t in a for item in t]
        measurements.insert(1,'measurement_name')


        import json

        #Produce Information
        cursor.execute("""SELECT produce_amount,produce_type,harvesting_date FROM produce_table WHERE produce_id=%s""",[produce_id])
        products=cursor.fetchone()



        return (dict(greenhouse=a,plants=b,produce_name=products["produce_type"],produce_amount=products["produce_amount"],
                     harvesting_date=str(products["harvesting_date"])))




