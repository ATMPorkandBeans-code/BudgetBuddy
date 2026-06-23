from flask import request, session
from flask_restful import Resource
from config import app, db, api
from models import User, UserSchema, Category, CategorySchema, Expense, ExpenseSchema
from sqlalchemy.exc import IntegrityError
from flask import make_response

class Users(Resource):
    def post(self):
       request_json = request.get_json()
       user = User(
           username=request_json["username"]
       )
       try:
           db.session.add(user)
           db.session.commit()
           return UserSchema().dump(user), 201
       except IntegrityError:
           return {'error': '422 Unprocessable Entity'}, 422
       
class Login(Resource):
    def post(self):
        username = request.get_json()['username']

        user = User.query.filter(User.username == username).first()
        if user:
            session['user_id'] = user.id
            session['username'] = user.username
            return UserSchema().dump(user), 200
        
        return {'error': 'User not Found'}, 404 
    
class Logout(Resource):
    def delete(self):
        if session.get('user_id'):
            session['user_id'] = None
            return {}, 204
        return {'error': 'No user_id in session.'}
         
class UpdateIncome(Resource):
    def put(self):
        user_id = session.get('user_id')

        if not user_id:
            return {"error": "No active session"}, 401
        
        user = user.query.get(user_id)
        user.income = request.get_json()['income']

        db.session.commit()
        return UserSchema().dump(user), 201




        


       

api.add_resource(Users, '/users', endpoint='users')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')
api.add_resource(UpdateIncome, '/users/income')





if __name__ == '__main__':
    app.run(debug=True)