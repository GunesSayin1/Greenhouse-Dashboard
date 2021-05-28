from run import db
from datetime import date, datetime

cursor = db.cursor(buffered=True, named_tuple=True)

def days_between(d1, d2):
    """

    :param d1: First Date
    :param d2: Second Date
    :return: Difference between two dates in days
    """
    d1 = datetime.strptime(d1, "%Y-%m-%d")
    d2 = datetime.strptime(d2, "%Y-%m-%d")
    return abs((d2 - d1).days)


class Greenhouse_Entries:
    def __init__(self, gh_id, sensor_type, sensor_id, sensor_status, measurement_name, measurement,
                 maintenance_date=None, life_expectancy=None):
        """
        Greenhouse Related Sensor Entries Model
        :param gh_id:
        :param sensor_type:
        :param sensor_id:
        :param sensor_status:
        :param measurement_name:
        :param measurement:
        :param maintenance_date:
        :param life_expectancy:
        """
        self.gh_id = gh_id
        self.sensor_id = sensor_id  # TODO
        self.type = sensor_type
        self.sensor_status = sensor_status
        self.measurement_name = measurement_name
        self.measurement = measurement
        self.maintenance_date = maintenance_date
        self.life_expectancy = life_expectancy

        if maintenance_date and life_expectancy != None:
            self.remaining_days_to_maintenance = str(days_between(maintenance_date, date.today().strftime('%Y-%m-%d')))
            self.remaining_life = str(days_between(life_expectancy, date.today().strftime('%Y-%m-%d')))
        else:
            self.remaining_days_to_maintenance = None
            self.remaining_life = None

    def save_to_db(self):
        """
        :return: Saves parameters to database
        """
        try:
            sql = "INSERT INTO sensor_entries (greenhouse_id,sensor_id,sensor_status," \
                  "measurement_name,measurement,maintenance_date,remaining_days_to_maintenance,remaining_life,life_expectancy,sensor_type,measurement_date)" \
                  " VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"

            values = (
                self.gh_id, self.sensor_id, self.sensor_status, self.measurement_name, self.measurement,
                self.maintenance_date, self.remaining_days_to_maintenance, self.remaining_life, self.life_expectancy,
                self.type, datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            )
            cursor = db.cursor()
            cursor.execute(sql, values)
            db.commit()
        except:
            return{"Message":"There was an error while inserting greenhouse measurements"}