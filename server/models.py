from marshmallow import Schema, fields
from config import db

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    income = db.Column(db.Numeric(10, 2))

    expenses = db.relationship('Expense', back_populates='user')

    def __repr__(self):
        return f'User {self.username}, ID: {self.id}'

class UserSchema(Schema):
    id = fields.Int()
    username = fields.String(required=True)
    income = fields.Decimal(places=2, as_string=True)

    expenses = fields.List(fields.Nested(lambda: ExpenseSchema(exclude=("user",))))

class Category(db.Model):
    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String, nullable=False)
    subcategory = db.Column(db.String, nullable=False)

    expenses = db.relationship('Expense', back_populates="category")

    def __repr__(self):
        return f'<Category: {self.category} Subcategory: {self.subcategory}>'
    
class CategorySchema(Schema):
    id = fields.Int()
    category = fields.String()
    subcategory = fields.String()

    expenses = fields.List(fields.Nested(lambda: ExpenseSchema(exclude=("category",))))


class Expense(db.Model):
    __tablename__ = 'expenses'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'))
    name = db.Column(db.String, nullable=False)
    amount = db.Column(db.Numeric(10, 2))
    is_fixed = db.Column(db.Boolean, nullable=False)

    user = db.relationship('User', back_populates="expenses")
    category = db.relationship('Category', back_populates="expenses")

    def __repr__(self):
        return f'<Name: {self.name}, Amount: {self.amount} Is_Fixed: {self.is_fixed}>'
    
class ExpenseSchema(Schema):
    id = fields.Int()
    name = fields.String(required=True)
    amount = fields.Decimal(places=2, as_string=True)
    is_fixed = fields.Boolean(required=True)

    user = fields.Nested(UserSchema(exclude=("expenses",)))
    category = fields.Nested(CategorySchema(exclude=("expenses",)))










    


