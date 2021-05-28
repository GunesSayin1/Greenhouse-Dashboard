from run import db
cursor = db.cursor(buffered=True, named_tuple=True)
class RevokedTokenModel:
    """Revokes the JTI tokens POSTed while logging out.
       Another function is to check if revoked token is available at Revoked Tokens Table
    """

    def __init__(self, jti):
        self.jti = jti

    def add(self, jti):
        cursor = db.cursor()
        sql = ("INSERT INTO revoked_tokens(jti) VALUES('%s')" % (jti))
        cursor.execute(sql)
        db.commit()

    @classmethod
    def is_jti_blacklisted(cls, jti):
        cursor.execute("SELECT * FROM revoked_tokens WHERE jti=%s", [jti])
        jtis = cursor.fetchall()
        if jtis != []:
            return None
        else:
            return False
