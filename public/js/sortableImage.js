class SortableImageUploader {
    constructor(containerSelector, fileInputSelector, maxImages = 10) {
        this.container = $(containerSelector);
        this.fileInput = $(fileInputSelector);
        this.maxImages = maxImages;
        this.images = [];
        this.init();
    }

    init() {
        this.fileInput.change((event) => {
            this.images = Array.from(event.target.files);
            this.displayImages();
        });

        const defaultFiles = this.fileInput.prop('files');
        this.images = Array.from(defaultFiles);
        this.displayImages();

        this.container.sortable({
            animation: 300,
            ghostClass: 'ghost',
            draggable: ".img-container:has(.uploaded-image)",
            onUpdate: (evt) => {
                const oldIndex = evt.oldIndex;
                const newIndex = evt.newIndex;

                const draggedImage = this.images.splice(oldIndex, 1)[0];
                this.images.splice(newIndex, 0, draggedImage);

                this.updateFileInput();
            }
        });
    }

    displayImages() {
        this.container.empty();

        const imgCount = Math.min(this.images.length, this.maxImages);
        for (let i = 0; i < imgCount; i++) {
            const image = this.images[i];
            if (image && image.type && image.type.startsWith('image/')) {
                const imgContainer = $('<div class="img-container"></div>');
                const img = $('<img class="uploaded-image">').attr('src', URL.createObjectURL(image));
                const deleteButton = $('<button class="delete-btn"><span class="material-symbols-rounded">delete</span></button>').on('click', () => {
                    this.images.splice(i, 1);
                    this.displayImages();
                });
                imgContainer.append(img, deleteButton);
                this.container.append(imgContainer);
            }
        }

        if (imgCount < this.maxImages) {
            for (let i = imgCount; i < this.maxImages; i++) {
                const imgContainer = $('<div class="img-container"></div>');
                const img = $('<img class="template-image">').attr('src', '/public/img/template-img.svg');
                const addButton = $('<button type="button" class="add-btn"><span class="material-symbols-rounded">add</span></button>').on('click', () => {
                    const input = $('<input type="file" accept="image/*" multiple>').on('change', (event) => {
                        const newFiles = event.target.files;
                        this.images = this.images.concat(Array.from(newFiles));
                        this.displayImages();
                    });
                    input.click();
                });
                imgContainer.append(img, addButton);
                this.container.append(imgContainer);
            }
        }
    }

    updateFileInput() {
        if (this.images.length > this.maxImages) {
            alert('Вы можете загружать максимум 10 фотографии');
        } else {
            const newFileList = new DataTransfer();
            this.images.forEach(image => newFileList.items.add(new File([image], image.name, { type: image.type })));
            this.fileInput[0].files = newFileList.files;
        }
        this.displayImages();
    }

    uploadImagesFromArray(imageArray) {
        try {
             if (!Array.isArray(imageArray)) {
                console.error('Parameter must be an array of images.');
                return;
            }

            this.images = imageArray.filter(image => image && image.type && image.type.startsWith('image/'));

            if (this.images.length > this.maxImages) {
                console.error(`Exceeded maximum allowed images. Maximum: ${this.maxImages}`);
                return;
            }

            this.displayImages();
            this.updateFileInput();
        } catch (error) {
            console.log(error);
        }
       
    }

    getUploadedImages() {
        return this.images;
    }
}