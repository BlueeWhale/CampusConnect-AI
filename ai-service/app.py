from flask import (
    Flask,
    request,
    jsonify
)

from flask_cors import CORS

import os

from face_recognition_service import (
    FaceService
)

# APP
app = Flask(__name__)

CORS(app)

# UPLOAD FOLDER
UPLOAD_FOLDER = "uploads"

os.makedirs(
    UPLOAD_FOLDER,
    exist_ok=True
)

app.config[
    "UPLOAD_FOLDER"
] = UPLOAD_FOLDER

# FACE SERVICE
face_service = FaceService()

# HOME
@app.route("/", methods=["GET"])
def home():

    return jsonify({
        "message":
        "AI Face Recognition API Running 🚀"
    })

# VERIFY FACE
@app.route(
    "/verify-face",
    methods=["POST"]
)
def verify_face():

    try:

        # CHECK IMAGE
        if "image" not in request.files:

            return jsonify({
                "success": False,
                "message": "No image uploaded"
            })

        image = request.files["image"]

        # SAVE IMAGE
        image_path = os.path.join(
            app.config["UPLOAD_FOLDER"],
            image.filename
        )

        image.save(image_path)

        # VERIFY FACE
        result = (
            face_service.verify_face(
                image_path
            )
        )

        return jsonify(result)

    except Exception as e:

        return jsonify({
            "success": False,
            "message": str(e)
        })

# RUN
if __name__ == "__main__":

    app.run(
        debug=True,
        port=5002
    )