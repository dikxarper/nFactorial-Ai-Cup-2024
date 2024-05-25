const faceImageUpload = document.getElementById('face-image')
const passportImageUpload = document.getElementById('passport-image')
const faceImageDisplay = document.getElementById('output-face-image')
const passportImageDisplay = document.getElementById('output-passport-image')
const successAlert = document.querySelector('.alert-success')
const failureAlert = document.querySelector('.alert-danger')

var faceDescriptor, passportDescriptor;

async function compareFaces() {
    await Promise.all([
        faceapi.nets.ssdMobilenetv1.loadFromUri('/public/pyscripts/models/js'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/public/pyscripts/models/js'),
        faceapi.nets.faceRecognitionNet.loadFromUri('/public/pyscripts/models/js')
    ]);

    handleImageUpload('face');
    handleImageUpload('passport');
}

function handleImageUpload(type) {
    const imgUpload = type === 'face' ? faceImageUpload : passportImageUpload;
    const imgDisplay = type === 'face' ? faceImageDisplay : passportImageDisplay;

    const file = imgUpload.files[0];
    imgDisplay.src = URL.createObjectURL(file);
    
    $("#compare-btn-spinner").show();
    $("#compare-btn").addClass('disabled');

    faceapi.detectSingleFace(imgDisplay).withFaceLandmarks().withFaceDescriptor()
        .then(detection => {
            console.log(`${type} image Face detection result:`, detection)

            if (type === 'face') {
                faceDescriptor = detection.descriptor;
            } else {
                passportDescriptor = detection.descriptor;
            }

            if (faceDescriptor && passportDescriptor) {
                compare();
            }
        })
        .catch(error => {
            failureAlert.style.display = 'block';
            $("#compare-btn-spinner").hide();
            $("#compare-btn").removeClass('disabled');
        });
}

function compare(){
    const distance = faceapi.euclideanDistance(faceDescriptor, passportDescriptor);
    console.log('Euclidean distance between face descriptors:', distance)

    if (distance < 0.6) {
        successAlert.style.display = 'block';
        failureAlert.style.display = 'none';
        console.log('Лица совпадают: фотография соответствует паспорту.')

        let id = localStorage.getItem('userId');
        alert("Процесс идет");
        setTimeout(() => {
            location.href = `/profile/${localStorage.getItem('userId')}`
        }, 3000);
    } else {
        successAlert.style.display = 'none';
        failureAlert.style.display = 'block';
        console.log('Лица не совпадают: фотография не соответствует паспорту.')
    }
    $("#compare-btn-spinner").hide();
    $("#compare-btn").removeClass('disabled');
}