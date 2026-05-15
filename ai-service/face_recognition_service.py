import face_recognition


class FaceService:

    def __init__(self):

        # LOAD KNOWN IMAGE
        known_image = face_recognition.load_image_file(
            "known_faces/student.jpg"
        )

        # ENCODE FACE
        self.known_encoding = (
            face_recognition.face_encodings(
                known_image
            )[0]
        )

    # VERIFY FACE
    def verify_face(self, image_path):

        try:

            # LOAD UPLOADED IMAGE
            unknown_image = (
                face_recognition.load_image_file(
                    image_path
                )
            )

            # ENCODE FACE
            unknown_encodings = (
                face_recognition.face_encodings(
                    unknown_image
                )
            )

            # NO FACE FOUND
            if len(unknown_encodings) == 0:

                return {
                    "success": False,
                    "message": "No face detected"
                }

            unknown_encoding = (
                unknown_encodings[0]
            )

            # COMPARE FACE
            results = (
                face_recognition.compare_faces(
                    [self.known_encoding],
                    unknown_encoding
                )
            )

            # MATCH FOUND
            if results[0]:

                return {
                    "success": True,
                    "message": "Face Verified ✅"
                }

            else:

                return {
                    "success": False,
                    "message": "Face Not Matched ❌"
                }

        except Exception as e:

            return {
                "success": False,
                "message": str(e)
            }