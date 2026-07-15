from flask import Blueprint

auth_bp = Blueprint('auth', __name__)
colleges_bp = Blueprint('colleges', __name__)
branches_bp = Blueprint('branches', __name__)
cutoffs_bp = Blueprint('cutoffs', __name__)
choices_bp = Blueprint('choices', __name__)
recommendations_bp = Blueprint('recommendations', __name__)
admin_bp = Blueprint('admin', __name__)

from . import auth, colleges, branches, cutoffs, choices, recommendations, admin
