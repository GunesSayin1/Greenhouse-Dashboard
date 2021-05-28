"""
This module initializes the endpoints' methods and the logic for them. (User Related)
Logın
Regıstratıon
Logout
Tokens
"""
from flask_restful import Resource, reqparse
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity, get_jwt
from models.RevokedTokensModel import RevokedTokenModel
from models.UserModel import UserModel
parser = reqparse.RequestParser()
parser.add_argument('email', help = 'This field cannot be blank', required = True)
parser.add_argument('password', help = 'This field cannot be blank', required = True)
parser.add_argument('name', help = 'This field cannot be blank', required = False)
parser.add_argument('phone_number', help = 'This field cannot be blank', required = False)
parser.add_argument('address', help = 'This field cannot be blank', required = False)
parser.add_argument('gender', help = 'This field cannot be blank', required = False)
parser.add_argument('sub_newsletter', help = 'This field cannot be blank', required = False)
parser.add_argument('experience', help = 'This field cannot be blank', required = False)
GH = {}

class UserRegistration(Resource):
    """
    /register:
        Available Methods:
                        POST: Saves the credentials to the database.
                              Returns Access token and refresh token with email identity in payload.

    """
    def post(self):
        data = parser.parse_args()
        if UserModel.find_by_username(data['email']):
            return{'message':'User {} already exists'.format(data['email'])}
        new_user = UserModel(
            email = data['email'],
            password=UserModel.generate_hash(data['password']),
            name=data["name"],
            phone_number=data["phone_number"],
            address=data["address"],
            gender=data["gender"],
            sub_newsletter=int(data["sub_newsletter"]),
            experience=data["experience"]
        )
        # try:
        new_user.save_to_db()
        access_token = create_access_token(identity = data['email'])
        refresh_token = create_refresh_token(identity = data['email'])
        return {
            'message': 'User {} was created'.format(data['email']),
            'access_token': access_token,
            'refresh_token': refresh_token
            }
        # except:
        #     return {'message':'Something went wrong'},500


class UserLogin(Resource):
    """
    /Login:
        Available Methods:
                        POST: Verifies if given password equates with hashed version in the database for given username.
                        If so;
                              Returns Access token and refresh token with username identity in payload.
    """
    def post(self):
        data = parser.parse_args()
        current_user = UserModel.find_by_username(data['email'])
        if not current_user:
            return {'message': 'User {} doesn\'t exist'.format(data['email'])}


        if UserModel.verify_hash(data['password'], current_user.password):
            access_token = create_access_token(identity=data['email'])
            refresh_token = create_refresh_token(identity=data['email'])
            return {
                'message': 'Logged in as {}'.format(current_user.email),
                'access_token': access_token,
                'refresh_token': refresh_token
            }
        else:
            return {'message': 'Wrong credentials'}



class UserLogoutAccess(Resource):
    """
    /logout/access:
        Available Methods:
                        POST: Adds the current assigned Access token to the blacklist table.
    """
    @jwt_required()
    def post(self):
        jti = get_jwt()["jti"]
        try:
            revoked_token = RevokedTokenModel(jti=jti)
            revoked_token.add(jti)
            return {'message': 'Access token has been revoked'}
        except:
            return {'message': 'Something went wrong'}, 500


class UserLogoutRefresh(Resource):
    """
    /logout/refresh:
        Available Methods:
                        POST: Adds the current assigned Refresh token to the blacklist table.
    """
    @jwt_required(refresh=True)
    def post(self):
        jti = get_jwt()['jti']
        try:
            revoked_token = RevokedTokenModel(jti=jti)
            revoked_token.add(jti)
            return {'message': 'Refresh token has been revoked'}
        except:
            return {'message': 'Something went wrong'}, 500

class TokenRefresh(Resource):
    """
    /token/refresh:
        Available Methods:
                        POST: Returns new access token if given refresh token is valid.
    """
    @jwt_required(refresh=True)
    def post(self):
        current_user = get_jwt_identity()
        access_token = create_access_token(identity = current_user)
        return {'access_token': access_token}


class AllUsers(Resource):
        def get(self):
            return UserModel.return_all()

        def delete(self):
            return UserModel.delete_all()


class SecretResource(Resource):
    @jwt_required()
    def get(self):
        return {
            'answer': 3169
        }


class Test(Resource):
    def get(self):
        return {
            'message': 3161
        }
