from run import db
cursor = db.cursor(buffered=True, named_tuple=True)
class Plant:
    def __init__(self, plant_type, planting_date, number_of_spots, sensors, gh_id, reoccurring):
        """
        Plants of the greenhouse
        :param plant_type:
        :param planting_date:
        :param number_of_spots:
        :param sensors:
        :param gh_id:
        :param reoccurring:
        """
        self.type = plant_type
        self.date = planting_date
        self.spots = number_of_spots
        self.sensors = sensors
        self.gh_id = gh_id
        self.reoccurring = reoccurring

    def save_to_db(self):
        """
        :return: Creates n amount of plants for given greenhouse
        """
        try:
            for n in range(self.spots):
                sql = "INSERT INTO plant_table (plant_type,plant_sensor_amount,planting_date,greenhouse_id,reoccurring,active) VALUES(%s,%s,%s,%s,%s,%s)"
                values = (self.type, len(self.sensors), self.date, self.gh_id, self.reoccurring, 1)
                cursor = db.cursor()
                cursor.execute(sql, values)
                db.commit()
        except:
            return{"Message":"There was an error while creating plants"}
    @classmethod
    def get_plant_id(cls, greenhouse_id):
        """
        :param greenhouse_id:
        :return: plant_ids for given greenhouse
        """
        cursor.execute("SELECT plant_id FROM plant_table WHERE greenhouse_id=%s", [greenhouse_id])
        existing_plants = [item[0] for item in cursor.fetchall()]
        return existing_plants

    @classmethod
    def plant_return_all(self, greenhouse_id):
        """
        :param greenhouse_id:
        :return: JSON, All plants in greenhouse
        """
        try:
            cursor = db.cursor(buffered=True,named_tuple=True)
            cursor.execute("SELECT * FROM plant_table WHERE greenhouse_id=%s", [greenhouse_id])
            k = cursor.fetchall()

            def to_json(x):
                return {
                    'greenhouse_id': x.greenhouse_id,
                    'plant_id': x.plant_id,
                    'plant_type': x.plant_type,
                    'planting_date': str(x.planting_date)
                }

            return {'Plants in your greenhouse:': list(map(lambda x: to_json(x), k))}
        except:
            return{"Message":"There was an error while getting plants from your greenhouse"}

    @classmethod
    def get_recent_plant_measurements(cls,gh_id):
        """

        :param gh_id:
        :return: Last different(Measurement_name wise) plant measurements
        """
        cursor.execute("""
                            SELECT s1.*
                            FROM sensor_entries s1
                            JOIN
                            (
                              SELECT plant_id, measurement_name,max(measurement_date) AS mts
                              FROM sensor_entries
                              WHERE sensor_type = 1 AND greenhouse_id = %s
                              GROUP BY measurement_name,plant_id
                            ) s2
                                ON s2.plant_id = s1.plant_id AND s1.measurement_date = s2.mts
    
                                ORDER BY s2.plant_id ASC
                                
                            """,[gh_id])
        return cursor.fetchall()

    @classmethod
    def get_metrics(cls, greenhouse_id, plant_id):
        """
        :param greenhouse_id:
        :param plant_id:
        :return: All measurements
        """
        cursor.execute("""
          SELECT greenhouse_id, plant_id, measurement_name,measurement,measurement_date
          FROM sensor_entries
          WHERE sensor_type = 1 AND plant_id = %s AND greenhouse_id = %s AND sensor_status =1
          ORDER BY measurement_date ,measurement_name""",[plant_id,greenhouse_id])
        k=cursor.fetchall()
        def to_json(z):
            return {
                'measurement_name': z.measurement_name,
                'measurement': z.measurement,
                'measurement_date': str(z.measurement_date)
            }
        return dict(measurements=list(map(lambda z: to_json(z),k)))
