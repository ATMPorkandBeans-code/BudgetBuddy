from app import app, db
from models import Category

with app.app_context():
    db.session.query(Category).delete()
    db.session.commit()

    categories = [
    # Needs (50%)
    {"name": "Housing",                  "subcategory": "needs"},
    {"name": "Utilities",                "subcategory": "needs"},
    {"name": "Groceries",                "subcategory": "needs"},
    {"name": "Transportation",           "subcategory": "needs"},
    {"name": "Insurance",                "subcategory": "needs"},
    {"name": "Minimum Debt Payments",    "subcategory": "needs"},

    # Wants (30%)
    {"name": "Dining Out",               "subcategory": "wants"},
    {"name": "Shopping",                 "subcategory": "wants"},
    {"name": "Streaming Services",       "subcategory": "wants"},
    {"name": "Travel",                   "subcategory": "wants"},
    {"name": "Hobbies",                  "subcategory": "wants"},
    {"name": "Upgraded Tech",            "subcategory": "wants"},

    # Savings (20%)
    {"name": "Emergency Fund",           "subcategory": "savings"},
    {"name": "Retirement Savings",       "subcategory": "savings"},
    {"name": "Investments",              "subcategory": "savings"},
    {"name": "Extra Debt Principal",     "subcategory": "savings"},
]
    
    for c in categories:
        category = Category(
            category=c["name"],
            subcategory=c["subcategory"]
        )
        db.session.add(category)

    db.session.commit()
    
