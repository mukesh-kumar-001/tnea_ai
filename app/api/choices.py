from flask import jsonify
from . import choices_bp

@choices_bp.route('/', methods=['GET'])
def get_choices():
    return jsonify([])
