"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/signup', methods=['GET'])
def get_user():
    user = User.query.all()
    user_list = list(map(lambda x: x.serialize(),user))
    return jsonify(user_list), 200

@api.route('/signup/<int:user_id>', methods=['GET'])
def get1_user():
    user = User.query.get(user_id)
    return jsonify(user)

@api.route('/signup', methods=['POST'])
def create_user():
    
    response_body = request.get_json()
    new_user = User(email=response_body['email'], password=response_body['password'], first_name=response_body['first_name'], last_name=response_body['last_name'], dob=response_body['dob'])
    db.session.add(new_user)
    db.session.commit()
    return "success", 200


@api.route('/login', methods=['GET'])
def get_login():
    login = Login.query.all()
    login_list = list(map(lambda x: x.serialize(),login))
    return jsonify(login_list), 200


@api.route('/login/<int:login_id>', methods=['GET'])
def get1_login():
    login = Login.query.get(login_id)
    return jsonify(login)


@api.route('/login', methods=['POST'])
def create_login():
    body = request.get_json()
    if "email" not in body or body ['email'] == "":
        raise APIException("User not foud", status_code=400)
    if "password" not in body or body ['password'] == "":
        raise APIException("User not foud", status_code=400)

    user = User.query.filter_by(email=body['email']).first()

    if user == None or body['password'] != user.password:
        raise APIException("User not found or password incorrect", status_code=400)
    else:
        access_token = create_access_token(identity=body['email'])
        return jsonify(access_token=access_token)

@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    current_user=get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()
    return jsonify({"first_name": user.first_name, "email": user.email}), 200