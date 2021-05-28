from run import db
from passlib.hash import pbkdf2_sha256 as sha256

cursor = db.cursor(buffered=True, named_tuple=True)
class UserModel:
    """
    This class handles the registration and logging in. Initializes with username and password.
    Available functions are for:
        Saving to Database
        Finding by Username
        Generating and Verifying hash with SHA256
        Deleting users
    """

    def __init__(self, email, password, name, phone_number, address, gender, sub_newsletter, experience):
        __tablename__ = 'user_test'
        self.email = email
        self.password = password
        self.name = name
        self.phone_number = phone_number
        self.address = address
        self.gender = gender
        self.sub_newsletter = sub_newsletter
        self.experience = experience

    @staticmethod
    def generate_hash(password):
        return sha256.hash(password)

    @staticmethod
    def verify_hash(password, hash):
        return sha256.verify(password, hash)

    def save_to_db(self):
        sql = "INSERT INTO user_test (user_id,email,password,name,phone_number,address,gender,sub_newsletter,experience,user_type)" \
              " VALUES(UUID(),%s,%s,%s,%s,%s,%s,%s,%s,%s)"
        values = (
            self.email, self.password, self.name, self.phone_number, self.address, self.gender, self.sub_newsletter,
            self.experience,"user")
        cursor = db.cursor()
        cursor.execute(sql, values)

        db.commit()

    @classmethod
    def find_by_username(cls, email):
        try:
            cursor.execute("SELECT * FROM user_test WHERE email=%s", [email])
            existing_user = cursor.fetchone()
            return existing_user
        except IndexError:
            print("Byte out of range")

    @classmethod
    def return_all(self):
        cursor.execute("SELECT * FROM user_test")
        k = cursor.fetchall()

        def to_json(x):
            return {
                'username': x.email,
                'password': x.password
            }

        return {'users': list(map(lambda x: to_json(x), k))}

    @classmethod
    def delete_all(self):
        try:
            cursor.execute("DELETE FROM user_test")
            cursor.execute("SELECT ROW_COUNT() as DelRowCount")
            db.commit()
            num_rows_deleted = cursor.fetchone()
            return {'message': '{} row(s) deleted'.format(num_rows_deleted.DelRowCount)}
        except:
            return {'message': 'Something went wrong'}
